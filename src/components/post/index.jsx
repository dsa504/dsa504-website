import React from "react"
import Layout from "../layout"

const Post = ({ pageContext: { title, content } }) => {
  return (
    <Layout>
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Layout>
  )
}

export default Post
