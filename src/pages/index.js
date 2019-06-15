import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import HomeCalendar from "../components/home-calendar"
import HomePost from "../components/home-post"
import HomeCommittees from "../components/home-committees"

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
      render={HomeRoot}
    />
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
        <HomeCommittees
          committees={allWordpressWpCommittee.edges.map(edge => edge.node)}
        />
        <br />
        <br />
        <HomeCalendar events={allCalendarEvent.edges.map(edge => edge.node)} />
      </div>
    </div>
  )
}

export default IndexPage
