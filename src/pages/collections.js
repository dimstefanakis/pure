import React from "react"
import {Helmet} from "react-helmet";
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Collections from '../components/Collections/Collections';

const CollectionsPage = ({data}) => (
  <Layout>
      <Helmet>
        <title>Pure - Collections</title>
        <meta name="description" content="Collections" />
        <link rel="canonical" href="https://www.purethebrand.gr/collections" />
      </Helmet>

    <Collections data={data}/>
  </Layout>
)

export default CollectionsPage;

export const query = graphql`
  query {
    collections: allShopifyCollection {
      edges {
        node {
          products {
            availableForSale
            tags
            shopifyId
            variants {
              id
              selectedOptions {
                name
                value
              }
            }
          }
          title
          image{
            src
          }
        }
      }
    }
  }
`