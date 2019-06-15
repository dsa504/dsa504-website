import React from "react"
import { Link } from "gatsby"

const HomePost = ({ slug, slugYear, title, excerpt, slugMonth }) => {
  return (
    <article key={slug}>
      <Link to={`/posts/${slugYear}/${slugMonth}/${slug}`}>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
    </article>
  )
}

export default HomePost
