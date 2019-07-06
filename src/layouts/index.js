/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
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
            <div className="hero-index">
              <div className="wrap hero-wrap">
                <Image
                  imgName="dsanola_FBpage_banner-01.png"
                  className="hero-index-img"
                  alt={`A stylized map of the New Orleans riverfront captioned with "A better world is possible"`}
                  title={`A stylized map of the New Orleans riverfront captioned with " A better world is possible"`}
                />
              </div>
            </div>
          ) : null}

          <main id="content" className="wrap">
            {children}
          </main>
          <footer>
            <div className="footer" style={{ padding: "1em 2em" }}>
              <nav className="pull-left">
                <a itemProp="url" href="/">
                  <Image
                    style={{ width: 114, height: 100 }}
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

export default Layout
