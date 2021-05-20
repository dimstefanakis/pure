import React from 'react';
import { navigate } from "gatsby"  
import { Link } from 'gatsby';

import SizeTagList from '../SizeTagList/SizeTagList';
import ActionButton from '../ActionButton/ActionButton';
import './bestProduct.css';

function BestProduct({product}){
  return(
    <Link className="best-product" to={`/product/${product.handle}`}>
      <img src={product.images[0].originalSrc} className="best-product-image" />
      <div>
        <h1 className="best-product-handle">{product.title}</h1>
        {/*<p className="best-product-price cool-font">€{product.priceRange.minVariantPrice.amount}</p>*/}
        <ActionButton product={product}/>
      </div>
    </Link>
  )
}

export default BestProduct;
