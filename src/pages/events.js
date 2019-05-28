import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Calendar from "../components/calendar";

const HomeEvents = () => {
    return <StaticQuery query={graphql`
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
              monthAndDay: dateTime(formatString: "MMMM Do")
              dayOfWeek: dateTime(formatString: "dddd"),
              localTime: dateTime(formatString: "h:mm A")
              slugDate: dateTime(formatString: "YYYY-MM-DD")
              }
            end {
              dateTime
              monthAndDay: dateTime(formatString: "MMMM Do")
              dayOfWeek: dateTime(formatString: "dddd"),
              localTime: dateTime(formatString: "h:mm A")
            }
            htmlLink
          }
        }
      }
    }
  `}
        render={data => <Layout><Calendar items={data.allCalendarEvents.edges.map(edge => edge.node)} /></Layout>}
    />
}

export default HomeEvents;