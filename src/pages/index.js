import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <StaticQuery
      query={graphql`
        query WordPressHomeQuery {
          allWordpressPost(limit: 10) {
            edges {
              node {
                title
                slug
                excerpt
              }
            }
          }
        }
      `}
      render={data => (
        <>
          {data.allWordpressPost.edges.map(({ node }) => (
            <article>
              <Link to={`/posts/${node.slug}`}>
                <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </article>
          ))}
        </>
      )}
    />
    <Link to="/events/">Events</Link>
  </>
)

export default IndexPage
