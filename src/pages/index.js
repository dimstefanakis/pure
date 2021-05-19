import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Home from '../components/Home/Home';

const IndexPage = ({data}) => (
  <Layout>
    <Home data={data}/>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    products: allShopifyProduct(sort: { fields: [title] }) {
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
          products {
            availableForSale
            tags
            shopifyId
            tags
            variants {
              id
              selectedOptions {
                name
                value
              }
            }
          }
          title
        }
      }
    }
  }
`