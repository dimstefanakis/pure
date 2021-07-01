import React, { createContext, useReducer, useEffect, useContext } from "react"
import Client from "shopify-buy"

import { cartReducer } from "../reducers/CardReducer";

const SHOPIFY_CHECKOUT_STORAGE_KEY = "shopify_checkout_id"

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOP_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}`,
})

function createNewCheckout(cart) {
  return cart.checkout.create()
}

function fetchCheckout(client, id) {
  return client.checkout.fetch(id)
}

const initialCartState = {
  client,
  isAdding: false,
  checkout: { lineItems: [] },
}

const CartContext = createContext({
  cart: initialCartState,
  setCart: () => null,
})

const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  useEffect(() => {
    const initializeCheckout = async () => {
      const isBrowser = typeof window !== "undefined"
      const existingCheckoutId = isBrowser
        ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
        : null
      if (existingCheckoutId) {
        try {
          const checkout = await fetchCheckout(client, existingCheckoutId)
          if (!checkout.completedAt) {
            if (checkout) {
              dispatch({ type: "UPDATE_CHECKOUT", checkout })
            }
            return {
              client,
              checkout,
              isAdding: false,
            }
          }
        } catch(e) {
          console.log(
            "Something went wrong and the checkout key had to be erased"
          )
          localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null)
        }
      }
      const newCheckout = await createNewCheckout(client)
      localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, newCheckout.id)
      return {
        client,
        newCheckout,
        isAdding: false,
      }
    }

    initializeCheckout()
  }, [])

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

function useAddItemToCart() {
  const { dispatch } = useContext(CartContext)


  async function addItemToCart(variantId, quantity) {
    if (variantId === "" || !quantity) {
      console.error("Both a size and quantity are required.")
      return
    }
    const isBrowser = typeof window !== "undefined"
    const checkoutId = isBrowser
      ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
      : null
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]

    try{
      const newCheckout = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToAdd
      )
  
      dispatch({ type: "UPDATE_CHECKOUT", checkout: newCheckout })
    }catch(e){
      console.log(e)
    }
    
  }

  return addItemToCart
}

function useGoToCheckout() {
  const { cart } = useContext(CartContext)

  return () => {
    window.open(cart.checkout.webUrl)
  }
}

function useRemoveLineItems(){
  const { dispatch } = useContext(CartContext)

  const isBrowser = typeof window !== "undefined"
  const checkoutId = isBrowser
    ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
    : null

  async function removeLineItem(lineItemID){
    const newCheckout = await client.checkout.removeLineItems(checkoutId, [lineItemID])
    dispatch({ type: "UPDATE_CHECKOUT", checkout: newCheckout })
  }

  return removeLineItem
}

export { CartContext, CartContextProvider, useAddItemToCart, useGoToCheckout, useRemoveLineItems }
