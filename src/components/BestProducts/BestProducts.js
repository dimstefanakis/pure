import React from 'react';
import BestProduct from './BestProduct';
import './bestProducts.css';

function BestProducts({data}){
  console.log(data);
  return(
    <div className="best-products-container">
      {data.products.edges.map(product=>(
        <React.Fragment key={product.node.shopifyId}>
          <BestProduct product={product.node}/>
        </React.Fragment>
      ))}
    </div>
  )
}

export default BestProducts;
