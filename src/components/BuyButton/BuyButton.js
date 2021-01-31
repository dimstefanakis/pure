import React from 'react';
import { useAddItemToCart } from "../../contexts/CartContext";
import './buyButton.css';

function BuyButton({product}){
  const addItemToCart = useAddItemToCart();

  function handleAddToCart(variant){
    addItemToCart(variant.variants[0].shopifyId, 1)
  }

  return(
    <div className="buy-button cool-font" onClick={()=>handleAddToCart(product)}>
      Purchase now
    </div>
  )
}

export default BuyButton;
