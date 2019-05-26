import React from "react";

const EventJsonLd = ({ summary, description, start, end, location }) => (
  <script type="application/ld+json">
    {`
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
    `}
  </script>
);

export default EventJsonLd;
