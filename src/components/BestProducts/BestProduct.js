import React from 'react';
import SizeTagList from '../SizeTagList/SizeTagList';
import ViewProduct from '../ViewProduct/ViewProduct';
import './bestProduct.css';

function BestProduct({product}){
  return(
    <div className="best-product">
      <img src={product.images[0].originalSrc} className="best-product-image" />
      <div>
        <p className="best-product-handle">{product.handle}</p>
        <p className="best-product-price">€{product.priceRange.minVariantPrice.amount}</p>
        <ViewProduct />
      </div>
    </div>
  )
}

export default BestProduct;
