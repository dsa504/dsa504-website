import React from "react"
import Layout from "../../components/layout"
import {
  StaticGoogleMap as StaticGoogleMapNoKey,
  Marker,
} from "react-static-google-map"

const apiKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY

const EventDetail = ({ pageContext: { summary, description, location } }) => {
  return (
    <Layout>
      <article>
        <div style={{ display: "flex" }}>
          <div style={{ width: 400, flex: "1 0 auto" }}>
            {location ? (
              <StaticGoogleMap size="400x400">
                <Marker color="0x222222" label="X" {...{ location }} />
              </StaticGoogleMap>
            ) : null}
          </div>
          <div>
            <h1>{summary}</h1>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </article>
    </Layout>
  )
}

const mapStyle =
  "element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0xffffff&style=element:labels.text.stroke%7Cvisibility:off&style=feature:administrative%7Celement:geometry.fill%7Ccolor:0xc9323b&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9323b%7Cweight:1.2&style=feature:administrative.land_parcel%7Celement:labels.text.stroke%7Cweight:0.01&style=feature:administrative.locality%7Celement:geometry.fill%7Clightness:-1&style=feature:administrative.neighborhood%7Celement:labels.text.fill%7Csaturation:0%7Clightness:0&style=feature:administrative.neighborhood%7Celement:labels.text.stroke%7Cweight:0.01&style=feature:landscape%7Celement:geometry%7Ccolor:0xc9323b&style=feature:poi%7Celement:geometry%7Ccolor:0x99282f&style=feature:road%7Celement:geometry.stroke%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x99282f&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0x99282f&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0x99282f&style=feature:road.local%7Celement:geometry%7Ccolor:0x99282f&style=feature:transit%7Celement:geometry%7Ccolor:0x99282f&style=feature:water%7Celement:geometry%7Ccolor:0x090228"

const StaticGoogleMap = props => {
  return (
    <StaticGoogleMapNoKey
      {...{ apiKey }}
      {...props}
      scale={2}
      zoom={12}
      style={mapStyle}
    />
  )
}

export default EventDetail
