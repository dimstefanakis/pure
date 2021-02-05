import React from 'react';
import { graphql } from 'gatsby';
import { navigate } from "@reach/router"  
import Pagination from 'antd/es/pagination';
import Layout from '../layout';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import ActionButton from '../ActionButton/ActionButton';
import Search from '../Search/Search';
import Filters from '../Filters/Filters';
import './productsPage.css';

function ProductsPage({pageContext, data}){
  console.log(pageContext, data)
  return(
    <Layout>
      <SmallBackgroundImage src={Image} header="Products" subheader={`
      Sed ut nunc erat. Nam at commodo urna. Suspendisse lacinia arcu interdum, laoreet tortor ac,
      tempor nunc.`}/>
      <h1 className="image-text-splitter">Lorem ipsum dolor sit amet, consectetur.</h1>
      <Search products={data.products.edges} collections={data.collections.edges}/>
      <div style={{display: 'flex'}}>
          <Filters data={data}/>
          <div className="product-list">
          {data.products.edges.map(product=>(
            <ProductListItem product={product.node}/>
          ))}
        </div>
      </div>
      
      <div style={{marginTop: 40}}>
        <Pagination total={pageContext.count} showSizeChanger={false} current={pageContext.currentPage}/>
      </div>
    </Layout>
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
        <h1 className="best-product-handle">{product.handle}</h1>
        <p style={{marginBottom: 0}} className="best-product-price cool-font">€{product.priceRange.minVariantPrice.amount}</p>
        <span style={{color: product.availableForSale? '#4caf50': 'gray'}}>{product.availableForSale?'In stock': 'Out of stock'}</span>
        <ActionButton product={product} title="Purchace now"/>
      </div>
    </div>
  )
}

export default ProductsPage;

export const productListQuery = graphql`
  query productListQuery($skip: Int!, $limit: Int!) {
    products: allShopifyProduct(
      sort: { fields: [priceRange___maxVariantPrice___amount], order: DESC }
      limit: $limit
      skip: $skip
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
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants {
            id
            title
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
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants {
              id
              title
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