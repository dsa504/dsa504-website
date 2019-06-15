import React from "react"
import SEO from "./seo"

const Committee = ({ pageContext }) => (
  <>
    <SEO title={pageContext.title} />
    <h1>{pageContext.title}</h1>
  </>
)

export default Committee
