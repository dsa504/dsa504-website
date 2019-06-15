import React, { Fragment as F } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import { kebabCase } from "lodash"

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

          allCalendarEvent(limit: 10) {
            edges {
              node {
                summary
                id
                fields {
                  monthAndDay
                  slugDate
                  startLocalTime
                }
              }
            }
          }
        }
      `}
      render={data => <HomeRoot {...data} />}
    />
    <Link to="/events/">Events</Link>
  </>
)

const HomeRoot = ({
  allWordpressPost,
  allWordpressWpCommittee,
  allCalendarEvent,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        {allWordpressPost.edges.map(({ node }) => (
          <article key={node.slug}>
            <Link to={`/posts/${node.slugYear}/${node.slugMonth}/${node.slug}`}>
              <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </article>
        ))}
      </div>
      <div style={{ flex: "1 0 auto" }}>
        <Link to="/committees">
          <h3>Committees &amp; Caucuses</h3>
        </Link>
        {allWordpressWpCommittee.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link to={`/committees/${node.slug}`}>{node.title}</Link>
          </div>
        ))}
        <br />
        <br />
        <Link to="/events">
          <h3>Upcoming Events</h3>
        </Link>
        {allCalendarEvent.edges.map(({ node }, idx) =>
          node && node.id !== "dummy" ? (
            <F key={node.id}>
              {(node.fields.monthAndDay && !allCalendarEvent.edges[idx - 1]) ||
              (allCalendarEvent.edges[idx - 1] &&
                allCalendarEvent.edges[idx - 1].node.fields.monthAndDay !==
                  node.fields.monthAndDay) ? (
                <Link to={`/events/${node.fields.slugDate}`}>
                  {node.fields.monthAndDay}
                </Link>
              ) : null}
              <Link
                to={`/events/${node.fields.slugDate}/${kebabCase(
                  node.summary
                )}`}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      maxWidth: "18em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {node.summary}
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    {node.fields.startLocalTime}
                  </div>
                </div>
              </Link>
            </F>
          ) : null
        )}
      </div>
    </div>
  )
}

export default IndexPage
