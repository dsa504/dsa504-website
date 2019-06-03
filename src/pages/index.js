import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <StaticQuery
      query={graphql`
        query HomeQuery {
          allWordpressPost(limit: 10) {
            edges {
              node {
                title
                slug
                excerpt
              }
            }
          }

          allWordpressWpCommittee {
            edges {
              node {
                slug
              }
            }
          }
        }
      `}
      render={data => (
        <div style={{ display: "flex" }}>
          <div>
            {data.allWordpressPost.edges.map(({ node }) => (
              <article>
                <Link to={`/posts/${node.slug}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </article>
            ))}
          </div>
          <div>
            {data.allWordpressWpCommittee.edges.map(({ node }) => (
              <div>
                <Link to={node.slug}>{node.slug}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    />
    <Link to="/events/">Events</Link>
  </>
)

export default IndexPage
