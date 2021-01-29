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
  {
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          title
          shopifyId
          description
          handle
          images { 
            originalSrc
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants {
            title
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }
`
