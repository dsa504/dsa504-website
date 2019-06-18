import React from "react"
import { graphql } from "gatsby"
import SEO from "../seo"

const Post = ({
  data: {
    wordpressPost: { content, title },
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
  query WordpressPostBySlug($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
      id
      excerpt
      date(formatString: "MMMM Do, YYYY")
      slug
      content
      title
    }
  }
`

export default Post
