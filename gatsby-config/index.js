/* eslint-env node */
require("dotenv").config({
  path: `.env`,
})

const calendarConfig = require("./calendar")
const wordpressConfig = require("./wordpress")

const theme = {
  palette: {
    red: "#ec1f27",
    black: "#222",
  },
}

module.exports = {
  siteMetadata: {
    title: `DSA New Orleans`,
    description: `The New Orleans Chapter of Democratic Socialists of America"`,
    author: `dsaneworleans`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sass`,
    { resolve: `gatsby-plugin-jss`, options: { theme } },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-remove-fingerprints`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/../src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dsa-new-orleans`,
        short_name: `dsa504`,
        start_url: `/`,
        background_color: `#ec1f27`,
        theme_color: `#ec1f27`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    wordpressConfig,
    calendarConfig,
  ],
}
