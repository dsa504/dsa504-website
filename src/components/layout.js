/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Helmet from "react-helmet"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          {/* TODO: GROSS */}
          <link
            rel="stylesheet"
            id="wp-block-library-css"
            href="https://dsaneworleans.org/wp-includes/css/dist/block-library/style.min.css?ver=5.2.1"
            type="text/css"
            media="all"
          />
          <link
            rel="stylesheet"
            id="dsa504-stylesheet-css"
            href="https://dsaneworleans.org/wp-content/themes/dsa504wp/library/css/style.css?ver=5.2.1"
            type="text/css"
            media="all"
          />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `80px auto 0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
