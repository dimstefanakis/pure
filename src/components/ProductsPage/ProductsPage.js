import React, {useContext, useEffect, useState} from 'react';
import { graphql } from 'gatsby';
import {Helmet} from "react-helmet";
import {Drawer} from 'antd';
import { navigate } from "gatsby"  
import Pagination from 'antd/es/pagination';
import {useMediaQuery} from 'react-responsive';
import Layout from '../layout';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import ActionButton from '../ActionButton/ActionButton';
import Search from '../Search/Search';
import Filters from '../Filters/Filters';
import {StoreContext} from '../../contexts/StoreContext';
import './productsPage.css';

function ProductsPage({pageContext, data}){
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'});
  const [endProducts, setEndProducts] = useState(data.products.edges)
  const storeContext = useContext(StoreContext);

  useEffect(()=>{
    let options = []
    data.collections.edges.forEach(collection=>{
      collection.node.products.forEach(product=>{
        if(!options.find(o=>o.label==product.productType)){
          options.push({label: product.productType, value: product.productType })
        }
      })
    })
    // add all the tags on mount
    storeContext.updateFilterTags(options.map(o=>o.value));
  },[])

  useEffect(()=>{
    setEndProducts(oldProducts=>{
      let filterSet = storeContext.filteredCollection?
        data.collections.edges.find(c=>c.node.title==storeContext.filteredCollection).node.products:
        data.products.edges.map(p=>p.node)

      filterSet = filterSet.filter((f, i)=>{
        if(f.tags.some(tag=>storeContext.filteredTags.includes(tag))){
          return true;
        }

        if(storeContext.filteredTags.includes(f.productType)){
          return true;
        }
      })
      
      return filterSet;
    })
  },[storeContext])

  console.log("endProducts", endProducts)
  return(
    <Layout>
      <Helmet>
        <title>Pure - Products</title>
        <meta name="description" content="Browse all of our products" />
        <link rel="canonical" href="https://www.purethebrand.gr/products" />
      </Helmet>
      {/* <SmallBackgroundImage src={Image} header="Products" subheader={`
      Sed ut nunc erat. Nam at commodo urna. Suspendisse lacinia arcu interdum, laoreet tortor ac,
      tempor nunc.`}/>
      <h1 className="image-text-splitter">Lorem ipsum dolor sit amet, consectetur.</h1> */}
      <div className="search-container">
        <Search products={data.products.edges} collections={data.collections.edges}/>
        {isTabletOrMobile?<FilterButton data={data}/>:null}
      </div>
      <div style={{display: 'flex', width:'100%'}}>
          {isTabletOrMobile?null:<Filters data={data}/>}
          <div className="product-list">
          {endProducts.map(product=>{
            return(
              <ProductListItem key={product.node?product.node.handle:product.handle} product={product.node?product.node:product}/>
            )
          })}
          {endProducts==0?<h1 className="no-products">No products found</h1>:null}
        </div>
      </div>
      
      {/* <div style={{marginTop: 40}}>
        <Pagination total={pageContext.count} current={pageContext.currentPage} showSizeChanger={false}/>
      </div> */}
    </Layout>
  )
}

function FilterButton({data}){
  const [showDrawer, setShowDrawer] = useState(false);

  function onClose(){
    setShowDrawer(false);
  }

  return(
    <>
    <button className="filter-button" onClick={()=>setShowDrawer(true)}>Filter</button>
    <Drawer
      title="Filters"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={showDrawer}
    >
      <Filters data={data}/>
    </Drawer>
    </>
  )
}

function ProductListItem({product}){
  console.log(product)

  function handleClick(){
    navigate(`/product/${product.handle}`)
  }

  return(
    <div className="product-item" onClick={handleClick}>
      <img src={product.images[0].originalSrc} className="best-product-image" />
      <div style={{display:'flex', flexFlow:'column'}}>
        <h1 className="best-product-handle">{product.title}</h1>
        <p style={{marginBottom: 0}} className="best-product-price cool-font">€{product.priceRange.minVariantPrice.amount}</p>
        <span style={{color: product.availableForSale? '#4caf50': 'gray'}}>{product.availableForSale?'In stock': 'Out of stock'}</span>
        <ActionButton product={product} title="Purchace now"/>
      </div>
    </div>
  )
}

export default ProductsPage;

export const productListQuery = graphql`
  query productListQuery {
    products: allShopifyProduct(
      sort: { fields: [priceRange___maxVariantPrice___amount], order: DESC }
    ) {
      edges {
        node {
          title
          images {
            originalSrc
          }
          description
          availableForSale
          handle
          shopifyId
          descriptionHtml
          productType
          createdAt
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          variants {
            id
            title
            selectedOptions {
              name
              value
            }
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            shopifyId
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
    collections: allShopifyCollection {
      edges {
        node {
          title
          products {
            title
            images {
              originalSrc
            }
            description
            availableForSale
            handle
            shopifyId
            descriptionHtml
            productType
            createdAt
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            variants {
              id
              title
              selectedOptions {
                name
                value
              }
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
              shopifyId
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`