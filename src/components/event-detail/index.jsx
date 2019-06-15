/* eslint-env node */
import React from "react"
import { graphql } from "gatsby"
import SEO from "../seo"

const EventDetail = ({
  data: {
    calendarEvent: { mapImage, summary, description },
  },
}) => {
  return (
    <>
      <SEO title={summary} />
      <article>
        <div style={{ display: "flex" }}>
          <div
            style={{
              maxWidth: 400,
              height: 400,
              flex: "1 0 auto",
              backgroundImage: mapImage
                ? `url(${mapImage.childImageSharp.fluid.base64})`
                : null,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {mapImage ? (
              <img style={{ maxWidth: "100%" }} src={mapImage.publicURL} />
            ) : null}
          </div>
          <div>
            <h1>{summary}</h1>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query CalEvtById($id: String!) {
    calendarEvent(id: { eq: $id }) {
      id
      summary
      description
      creator {
        email
      }
      start {
        dateTime
      }
      end {
        dateTime
      }
      location
      mapImage {
        publicURL
        childImageSharp {
          fluid(maxWidth: 400) {
            base64
          }
        }
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
`

export default EventDetail
