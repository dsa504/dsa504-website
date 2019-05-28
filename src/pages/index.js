import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <StaticQuery query={graphql`
        query WordPressHomeQuery {
        allWordpressPost(limit: 2) {
          edges {
            node {
              title
              slug
              excerpt
            }
          }
        }
      }
    `} render={data => data.allWordpressPost.edges.map(({ node }) => <article><h2 dangerouslySetInnerHTML={{ __html: node.title }}></h2><div dangerouslySetInnerHTML={{ __html: node.excerpt }} /></article>)} />
    <Link to="/events/">Events</Link>
  </Layout>
)

export default IndexPage
