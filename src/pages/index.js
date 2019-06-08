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
                slugYear: date(formatString: "YYYY")
                slugMonth: date(formatString: "MM")
              }
            }
          }

          allWordpressWpCommittee {
            edges {
              node {
                slug
                title
              }
            }
          }
        }
      `}
      render={data => (
        <div style={{ display: "flex" }}>
          <div>
            {data.allWordpressPost.edges.map(({ node }) => (
              <article key={node.slug}>
                <Link to={`/posts/${node.slugYear}/${node.slugMonth}/${node.slug}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </article>
            ))}
          </div>
          <div>
            {data.allWordpressWpCommittee.edges.map(({ node }) => (
              <div key={node.slug}>
                <Link to={node.slug}>{node.title}</Link>
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
