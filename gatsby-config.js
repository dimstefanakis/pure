const path = require(`path`)
require("dotenv").config({
  path: `.env`,
})
//UA-146933923-2
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      // This plugin lets me access environment variables that
      // aren't prefixed with Gatsby. This allows me to use
      // Shopify-related variables in the context setup script.
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["SHOP_NAME", "SHOP_TOKEN"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop.
        storeUrl: 'purestoredev.myshopify.com',
        // The storefront access token
        apiKey: '2a8ebb2cc28c96200399baa4752ddd37',
        password: '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',
        apiVersion: "2021-04",
        verbose: true,
        shopifyConnections: ["orders", "collections"],
      },
    },
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-146933923-2", // Google Analytics / GA
          "G-1HJCJ5DDNL" // Google Ads / Adwords / AW
        ],
        pluginConfig: {
          head: true        
        },
      }
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-146933923-2",
    //     head: true,
    //     anonymize: true,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
