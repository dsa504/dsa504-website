/* eslint-env node */
//const normalizer = require("../src/wordpress-normalizer").default

module.exports = {
  resolve: "gatsby-source-wordpress",
  options: {
    baseUrl: process.env.WORDPRESS_BASE_URL,
    hostingWPCOM: false,
    includedRoutes: ["/*/*/posts", "/*/*/pages", "/*/*/committee"],
    plugins: [
      {
        resolve: `gatsby-wordpress-inline-images`,
        options: {
          baseUrl: process.env.WORDPRESS_BASE_URL,
          protocol: `http`,
        },
      },
    ],
    //   normalizer,
  },
}
