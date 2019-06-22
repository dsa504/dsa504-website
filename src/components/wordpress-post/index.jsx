import React from "react"
import { graphql } from "gatsby"
import SEO from "../seo"

const Post = ({
  data: {
    wordpressPost: { content, title, date },
  },
}) => {
  return (
    <>
      <SEO title={title} />
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p>Posted on {date}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query WordpressPostBySlug($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
      date(formatString: "MMMM Do, YYYY")
      content
      title
    }
  }
`

export default Post
