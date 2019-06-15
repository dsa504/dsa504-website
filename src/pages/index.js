import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import HomeCalendar from "../components/home-calendar"
import HomePost from "../components/home-post"

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
          <HomePost key={node.slug} {...node} />
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
        <HomeCalendar data={{ allCalendarEvent }} />
      </div>
    </div>
  )
}

export default IndexPage
