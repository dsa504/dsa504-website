import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Calendar from "../components/calendar";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/page-2/">Go to page 2</Link>
    <StaticQuery query={graphql`
      query CalendarEventsQuery {
        allCalendarEvents {
          edges {
            node {
              id,
              summary,
              creator { email },
              description,
              location,
              start {
                dateTime
                monthandDay: dateTime(formatString: "MMMM Do")
                dayOfWeek: dateTime(formatString: "dddd"),
                localTime: dateTime(formatString: "h:mm A")
                }
              end {
                dateTime
                monthandDay: dateTime(formatString: "MMMM Do")
                dayOfWeek: dateTime(formatString: "dddd"),
                localTime: dateTime(formatString: "h:mm A")
              }
              htmlLink
            }
          }
        }
      }
    `}
      render={data => <Calendar items={data.allCalendarEvents.edges.map(edge => edge.node)} />}
    />
  </Layout>
)

export default IndexPage
