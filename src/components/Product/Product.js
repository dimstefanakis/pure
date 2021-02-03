import React, {useState} from 'react';
import Layout from '../layout';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import SizeTagList from '../SizeTagList/SizeTagList';
import ActionButton from '../ActionButton/ActionButton';
import './product.css';

function Product({pageContext}){
  const product = pageContext.product;
  const [selected, setSelected] = useState(product.variants[0]);

  console.log(product);
  return(
    <Layout>
      {/*<SmallBackgroundImage src={Image} header={product.handle}/>*/}
      <div className="product-container">
        <div style={{height:'100%', width: '40%'}}>
          <img src={product.images[0].originalSrc} className="product-image"/>
        </div>
        <div className="product-description-container">
          <h1>{product.handle}</h1>
          <p className="cool-font" style={{maxWidth:800}}>{product.description}</p>
          <p className="cool-font" style={{fontWeight:'bold'}}>€{selected.priceV2.amount}</p>
          <SizeTagList variants={product.variants} selected={selected} setSelected={setSelected}/>
          <ActionButton product={product} title="Add to cart"/>
        </div>
      </div>
    </Layout>
  )
}

export default Product;
