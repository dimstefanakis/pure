import React, {useState, useEffect} from 'react';
import {navigate} from 'gatsby';
import {Image as AntdImage} from 'antd';
import {toast} from 'react-toastify';
import Layout from '../layout';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import SizeTagList from '../SizeTagList/SizeTagList';
import ColorList from '../ColorList/ColorList';
import AddToCart from '../AddToCart/AddToCart';
import './product.css';


// find variant id based on an array of options eg ['S', 'green']
function productTitleBuilder(options, variants){
  let foundVariant = variants[0]
  let formattedOptions = variants.map(variant=>{
    let arrayOptions = variant.title.split(" / ").map((item) => {
      return item.trim().toLowerCase();
    });

    return {
      variant: variant,
      arrayOptions: arrayOptions
    }
  })

  formattedOptions.forEach(variant=>{
    if(options.every(v => variant.arrayOptions.includes(v.toLowerCase()))){
      foundVariant = variant.variant;
    }
  })

  return foundVariant;
}

function Product({pageContext}) {
  const product = pageContext.product;
  const [selected, setSelected] = useState(product.variants[0]);
  const [sizeSelected, setSelectedSize] = useState(product.variants[0].selectedOptions.find(o=>o.name=='Size').value)
  const [colorSelected, setColorSelected] = useState(product.variants[0].selectedOptions.find(o=>o.name=='Color')?.value);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  function handleAddToCart(variant) {
    toast(<AddNotification product={product} />, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  let sizes = []
  product.variants.forEach(variant=>{
    let sizeOption = variant.selectedOptions.find(o=>o.name=='Size')
    if(sizeOption && !sizes.includes(sizeOption.value)){
      sizes.push(sizeOption.value)
    }
  })

  console.log("size", sizeSelected);
  let colors = []
  product.variants.filter(v=>v.selectedOptions.find(o=>o.value==sizeSelected)).forEach(variant=>{
    let colorOption = variant.selectedOptions.find(o=>o.name=='Color')
    if(colorOption && !colors.includes(colorOption.value)){
      colors.push(colorOption.value)
    }
  })
  console.log("sizes", sizes, selected)

  useEffect(()=>{
    let options = [colorSelected, sizeSelected]
    options = options.filter(o=>o)
    let foundVariant = productTitleBuilder(options, product.variants)
    setSelected(foundVariant);
    //let selectedProduct = product.variants.find();
  },[colorSelected, sizeSelected])
  
  return (
    <Layout>
      <div style={{width: '100%'}}>
        {/*<SmallBackgroundImage src={Image} header={product.handle}/>*/}
        <div className="product-container">
          <div className="product-image-container">
            <AntdImage src={selectedImage.originalSrc} className="product-image"/>
            {/* <img src={selectedImage.originalSrc} className="product-image" /> */}
          </div>
          <div className="product-images-container">
            <SecondaryImages
              images={product.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
          <div className="product-description-container">
            <h1>{product.title}</h1>
            <p className="cool-font" style={{maxWidth: 800}} dangerouslySetInnerHTML={{__html:product.descriptionHtml}}>
            </p>
            <p className="cool-font" style={{fontWeight: 'bold'}}>
              €{selected.priceV2.amount}
            </p>
            <SizeTagList
              variants={product.variants}
              sizes={sizes}
              selected={selected}
              setSelected={setSelectedSize}
            />
            <ColorList
              variants={product.variants}
              size={sizeSelected}
              colors={colors}
              selected={selected}
              setSelected={setColorSelected}
            />
            <AddToCart
              product={selected}
              onAddToCart={handleAddToCart}
              title="Add to cart"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function AddNotification({product}) {
  function handleClick() {
    navigate('/cart');
  }

  return (
    <div style={{color: '#3a3a3a'}}>
      <p style={{borderBottom: '1px solid #e8e8e8', fontWeight: 300}}>
        Added to cart
      </p>
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        <div style={{flexBasis: '30%'}}>
          <img
            alt="product"
            style={{width: '100%'}}
            src={product.images[0].originalSrc}
          />
        </div>
        <p style={{flexBasis: '50%', margin: '0 10px'}}>{product.title}</p>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button className="action-button cool-font" onClick={handleClick}>
          See cart
        </button>
      </div>
    </div>
  );
}

function SecondaryImages({images, selectedImage, setSelectedImage}) {
  function handleClick(image) {
    setSelectedImage(image);
  }

  return (
    <div className="product-images">
      {images.map((img, i) => {
        return (
          <img
            key={i}
            onClick={() => handleClick(img)}
            alt="product-secondary"
            style={{
              width: 40,
              margin: 10,
              cursor: 'pointer',
              objectFit: 'contain',
              boxSizing: 'border-box',
              border:
                selectedImage.originalSrc == img.originalSrc
                  ? '2px solid black'
                  : '2px solid transparent',
            }}
            src={img.originalSrc}
          />
        );
      })}
    </div>
  );
}

export default Product;
