import React from 'react';
import { navigate } from "gatsby"  
import './actionButton.css';

function ActionButton({product, title="View product"}){
  
  function handleClick(){
    navigate(`/product/${product.handle}`)
  }
  return(
    <button className="action-button cool-font" onClick={handleClick}>{title}</button>
  )
}

export default ActionButton;
