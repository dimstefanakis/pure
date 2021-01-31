const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for all products in Shopify
  let result = await graphql(`
    {
      allShopifyProduct(sort: { fields: [title] }) {
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
    }
  `)
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/product/${node.handle}`,
      component: path.resolve(`./src/components/Product/Product.js`),
      context: {
        product: node,
      },
    })
  })

  result = await graphql(
    `
      {
        allShopifyProduct {
          totalCount
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // ...
  // Create blog-list pages
  const posts = result.data.allShopifyProduct.totalCount
  const postsPerPage = 15
  const numPages = Math.ceil(posts / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/products` : `/products/${i + 1}`,
      component: path.resolve("./src/components/ProductsPage/ProductsPage.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
