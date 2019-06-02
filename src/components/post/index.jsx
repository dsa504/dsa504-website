import React from "react"

const Post = ({ pageContext: { title, content } }) => {
  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}

export default Post
