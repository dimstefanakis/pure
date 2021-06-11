import React from 'react';
import { useAddItemToCart } from "../../contexts/CartContext";

function AddToCart({product, disabled=false, onAddToCart=()=>{}}){
  const addItemToCart = useAddItemToCart();

  function handleAddToCart(variant){
    if(!disabled){
      onAddToCart(product);
      addItemToCart(variant.shopifyId, 1)  
    }
  }

  return(
    <div className={`action-button cool-font ${disabled? 'button-disabled' : ''}`} 
    role="button" disabled={disabled} onClick={()=>handleAddToCart(product)}>
      Add to cart
    </div>
  )
}

export default AddToCart;
