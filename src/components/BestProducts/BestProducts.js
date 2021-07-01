import React from 'react';
import BestProduct from './BestProduct';
import './bestProducts.css';

function BestProducts({data}){
  return(
    <div className="best-products-container">
      {data.products.edges.filter(edge=>edge.node.tags.includes('display'))
      .map(product=>(
        <React.Fragment key={product.node.shopifyId}>
          <BestProduct product={product.node}/>
        </React.Fragment>
      ))}
    </div>
  )
}

export default BestProducts;
