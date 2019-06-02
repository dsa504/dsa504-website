require("dotenv").config({
  path: `.env`,
})

const today = new Date()
const timeMin = today.toISOString()
const timeMax = new Date(today.setMonth(today.getMonth() + 3)).toISOString()

const url = `${process.env.GOOGLE_CALENDAR_BASE_URL}/${
  process.env.GOOGLE_CALENDAR_ID
}/events`

const calendarParams = {
  key: process.env.GOOGLE_CALENDAR_API_KEY,
  orderBy: "startTime",
  singleEvents: true,
  timeMin,
  timeMax,
  timeZone: "America/Chicago",
}

module.exports = {
  siteMetadata: {
    title: `DSA New Orleans`,
    description: `The New Orleans Chapter of Democratic Socialists of America"`,
    author: `dsaneworleans`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-jss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: process.env.WORDPRESS_BASE_URL,
        hostingWPCOM: false,
        includedRoutes: ["/*/*/posts", "/*/*/pages"],
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: process.env.WORDPRESS_BASE_URL,
              protocol: `http`,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // The url, this should be the endpoint you are attempting to pull data from
        url,

        method: "get",

        headers: {
          "Content-Type": "application/json",
        },

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `CalendarEvents`,

        // Nested level of entities in response object, example: `data.posts`
        entityLevel: `items`,

        // Define schemaType to normalize blank values
        // example:
        // const postType = {
        //   id: 1,
        //   name: 'String',
        //   published: true,
        //   object: {a: 1, b: '2', c: false},
        //   array: [{a: 1, b: '2', c: false}]
        // }
        // schemaType: postType,

        // Request parameters
        // Only available from version 2.1.0
        params: calendarParams,

        // Optionally include some output when building
        // Default is false
        verboseOutput: true, // For debugging purposes
      },
    },
  ],
}
