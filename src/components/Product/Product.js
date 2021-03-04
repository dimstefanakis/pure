import React, {useState} from 'react';
import { navigate } from 'gatsby';
import { toast } from 'react-toastify';
import Layout from '../layout';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import SizeTagList from '../SizeTagList/SizeTagList';
import AddToCart from '../AddToCart/AddToCart';
import './product.css';

function Product({pageContext}){
  const product = pageContext.product;
  const [selected, setSelected] = useState(product.variants[0]);

  function handleAddToCart(variant) {
    toast(
      <AddNotification product={product}/>, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  console.log(selected);
  return(
    <Layout>
      {/*<SmallBackgroundImage src={Image} header={product.handle}/>*/}
      <div className="product-container">
        <div className="product-image-container">
          <img src={product.images[0].originalSrc} className="product-image"/>
        </div>
        <div className="product-description-container">
          <h1>{product.handle}</h1>
          <p className="cool-font" style={{maxWidth:800}}>{product.description}</p>
          <p className="cool-font" style={{fontWeight:'bold'}}>€{selected.priceV2.amount}</p>
          <SizeTagList variants={product.variants} selected={selected} setSelected={setSelected}/>
          <AddToCart product={selected} onAddToCart={handleAddToCart} title="Add to cart"/>
        </div>
      </div>
    </Layout>
  )
}

function AddNotification({product}){

  function handleClick(){
    navigate('/cart')
  }
  
  return(
    <div style={{color:'#3a3a3a'}}>
      <p style={{borderBottom:'1px solid #e8e8e8', fontWeight:300}}>Added to cart</p>
      <div style={{display:'flex',flexFlow:'row wrap'}}>
        <div style={{flexBasis:'30%'}}>
          <img
            alt="product"
            style={{width:'100%'}}
            src={product.images[0].originalSrc}
          />
        </div>
        <p style={{flexBasis:'50%', margin:'0 10px'}}>{product.title}</p>
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
        <button className="action-button cool-font" onClick={handleClick}>See cart</button>
      </div>
    </div>   
  )
}

export default Product;
