import React from 'react';
import { navigate } from "@reach/router"  
import './viewProduct.css';

function ViewProduct({product}){
  
  function handleClick(){
    navigate(`/product/${product.handle}`)
  }
  return(
    <button className="action-button cool-font" onClick={handleClick}>View product</button>
  )
}

export default ViewProduct;
