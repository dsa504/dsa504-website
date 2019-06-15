/* eslint-env node */
import React from "react"
import { graphql } from "gatsby"

const EventDetail = ({
  data: {
    calendarEvent: {
      mapImage, summary, description
    }
  }
}) => {

  return (
    <article>
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, flex: "1 0 auto" }}>
          {mapImage ? <img src={mapImage.publicURL} /> : null}
        </div>
        <div>
          <h1>{summary}</h1>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </article>
  )
}



export const pageQuery = graphql`
	query CalEvtById($id: String!) {
		calendarEvent(id: { eq: $id }) {
			id
      summary
      description
      creator { email }
      start { dateTime }
      end { dateTime }
      location
      mapImage {
        publicURL
      }
      fields {
        startLocalTime
        endLocalTime
        slugDate
        monthAndDay
        dayOfWeek
      }
		}
	}
`;

export default EventDetail
