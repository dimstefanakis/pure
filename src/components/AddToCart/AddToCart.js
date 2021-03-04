import React from 'react';
import { useAddItemToCart } from "../../contexts/CartContext";

function AddToCart({product, onAddToCart=()=>{}}){
  const addItemToCart = useAddItemToCart();

  function handleAddToCart(variant){
    onAddToCart(product);
    addItemToCart(variant.shopifyId, 1)
  }

  return(
    <div className="action-button cool-font" onClick={()=>handleAddToCart(product)}>
      Add to cart
    </div>
  )
}

export default AddToCart;
