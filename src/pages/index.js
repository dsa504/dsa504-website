import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeEvents from "./home-events";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <StaticQuery query={graphql`
        query WordPressPostsQuery {
        allWordpressPost(limit: 2) {
          edges {
            node {
              slug
              content
            }
          }
        }
      }
    `} render={data => data.allWordpressPost.edges.map(edge => <div dangerouslySetInnerHTML={{ __html: edge.node.content }} />)} />
    <Link to="/page-2/">Go to page 2</Link>
    <HomeEvents />
  </Layout>
)

export default IndexPage
