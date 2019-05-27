import React from "react"
import { StaticQuery, graphql } from "gatsby"
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
}

export default HomeEvents;