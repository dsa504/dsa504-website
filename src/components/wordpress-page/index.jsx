import React from "react"
import { graphql } from "gatsby"

const Page = ({
  data: {
    wordpressPage: { content, title },
  },
}) => {
  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}

export const pageQuery = graphql`
  query WordpressPageBySlug($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      id
      excerpt
      date(formatString: "MMMM Do, YYYY")
      slug
      content
      title
    }
  }
`

export default Page
