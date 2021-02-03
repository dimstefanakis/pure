import React from 'react';
import { useAddItemToCart } from "../../contexts/CartContext";

function AddToCart({product}){
  const addItemToCart = useAddItemToCart();

  function handleAddToCart(variant){
    addItemToCart(variant.variants[0].shopifyId, 1)
  }

  return(
    <div className="action-button cool-font" onClick={()=>handleAddToCart(product)}>
      Add to cart
    </div>
  )
}

export default AddToCart;
