import React from "react"
import { graphql } from "gatsby"
import SEO from "../seo"

const Page = ({
  data: {
    wordpressPage: { content, title },
  },
}) => {
  return (
    <>
      <SEO title={title} />
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query WordpressPageBySlug($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      date(formatString: "MMMM Do, YYYY")
      content
      title
    }
  }
`

export default Page
