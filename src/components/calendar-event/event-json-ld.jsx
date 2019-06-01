import React from "react"
import Helmet from "react-helmet"
const EventJsonLd = ({
  summary,
  description,
  start,
  end,
  location,
  ...rest
}) => {
  console.log(summary, ...rest)
  console.log(start)
  console.log(end)
  return (
    <Helmet>
      <script type="application/ld+json">{`
    {
      "@context": "http://www.schema.org",
      "@type": "Event",
      "name", "${summary}",
      "description": "${description}",
      "startDate": "${start.dateTime}",
      "endDate": "${end.dateTime}",
      "location": {
        "@type": "Place",
        "name" "${location}",
        "address": "${location}"
      }
    }
  `}</script>
    </Helmet>
  )
}

export default EventJsonLd
