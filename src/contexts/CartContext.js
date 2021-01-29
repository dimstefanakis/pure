import React, { createContext, useReducer, useEffect, useContext } from "react"
import Client from "shopify-buy"

import { cartReducer } from "../reducers/CartReducer"

const SHOPIFY_CHECKOUT_STORAGE_KEY = "shopify_checkout_id"

const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOP_TOKEN,
  domain: `${process.env.SHOP_NAME}`,
})

function createNewCheckout(cart) {
  return cart.checkout.create()
}

function fetchCheckout(client, id) {
  console.log(client);
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
          console.log("in");  
          const checkout = await fetchCheckout(client, existingCheckoutId)
          console.log(checkout);  
          if (!checkout.completedAt) {
            console.log("Checkout fetched from Shopify with id", checkout.id)
            console.log("Checkout contains", checkout.lineItems)
            if (checkout) {
              console.log("Updating checkout in browser")
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
      console.log("The new checkout id stored is", newCheckout.dispatch)
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
    console.log("in",variantId, quantity)
    if (variantId === "" || !quantity) {
      console.error("Both a size and quantity are required.")
      return
    }

    const isBrowser = typeof window !== "undefined"
    const checkoutId = isBrowser
      ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
      : null
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]

    console.log(checkoutId, lineItemsToAdd)
    try{
      const newCheckout = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToAdd
      )
  
      console.log(newCheckout)
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
    console.log("Going to Checkout!")
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
