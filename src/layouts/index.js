/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "../components/header"
import Image from "../components/image"
import "./layout.css"
import "../sass/style.scss"
import "../sass/wp-block-library.scss"

const Layout = ({ pageContext, children }) => (
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
        <div id="container">
          <Header siteTitle={data.site.siteMetadata.title} />
          {pageContext.layout === "home" ? (
            <div class="hero-index">
              <div class="wrap hero-wrap">
                <Image
                  imgName="dsa-new-orleans-hero-short.png"
                  className="hero-index-img"
                  alt="New Orleans Democratic Socialists of America"
                  title="New Orleans Democratic Socialists of America"
                />
              </div>
            </div>
          ) : null}

          <main id="content" className="wrap">
            {children}
          </main>
          <footer>
            <div className="footer">
              <nav className="pull-left">
                <a itemProp="url" href="/">
                  <Image
                    imgName="dsa-new-orleans-logo-footer.png"
                    alt="DSA New Orleans"
                    title="DSA New Orleans"
                  />
                </a>
                <span
                  className="microdata-logo"
                  itemProp="logo"
                  style={{ display: "none" }}
                >
                  <Image imgName="equal-access-legal-logo.png" />
                </span>
              </nav>
              <div className="copyright">
                <p>
                  © {new Date().getFullYear()}{" "}
                  <span itemProp="name">DSA New Orleans</span>
                  <br className="visible-xs" />
                  <span style={{ fontSize: "10px", color: "#7b7b7b" }}>
                    All rights reserved.
                  </span>
                </p>
              </div>
              <div className="additional-links">
                Get in Touch!
                <br />{" "}
                <a href="hello@dsaneworleans.org">hello@dsaneworleans.org</a>
              </div>
            </div>
            <br className="clearit" />
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
