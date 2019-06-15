import React, { Fragment as F } from "react"
import { Link } from "gatsby"
import { kebabCase } from "lodash"

const HomeCalendar = ({ data }) => {
  const allCalendarEvent = data && data.allCalendarEvent
  return allCalendarEvent ? (
    <div>
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
              to={`/events/${node.fields.slugDate}/${kebabCase(node.summary)}`}
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
  ) : null
}

export default HomeCalendar
