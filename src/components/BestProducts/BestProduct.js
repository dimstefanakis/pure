import React from 'react';
import SizeTagList from '../SizeTagList/SizeTagList';
import ActionButton from '../ActionButton/ActionButton';
import './bestProduct.css';

function BestProduct({product}){
  return(
    <div className="best-product">
      <img src={product.images[0].originalSrc} className="best-product-image" />
      <div>
        <h1 className="best-product-handle">{product.handle}</h1>
        {/*<p className="best-product-price cool-font">€{product.priceRange.minVariantPrice.amount}</p>*/}
        <ActionButton product={product}/>
      </div>
    </div>
  )
}

export default BestProduct;
