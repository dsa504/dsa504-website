import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Calendar from "../components/calendar"

const Events = () => {
  return (
    <StaticQuery
      query={graphql`
        query CalendarEventQuery {
          allCalendarEvent {
            edges {
              node {
                id
                summary
                creator {
                  email
                }
                description
                location
                htmlLink
                start {
                  dateTime
                }
                end {
                  dateTime
                }
                fields {
                  slugDate
                  startLocalTime
                  endLocalTime
                  monthAndDay
                  dayOfWeek
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Calendar
          fullScreen
          items={data.allCalendarEvent.edges.map(edge => edge.node)}
        />
      )}
    />
  )
}

export default Events
