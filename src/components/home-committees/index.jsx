import React from "react"
import { Link } from "gatsby"

const HomeCommittees = ({ committees }) => {
  return (
    <>
      <Link to="/committees">
        <h3>Committees &amp; Caucuses</h3>
      </Link>
      {committees.map(({ title, slug }) => (
        <div key={slug}>
          <Link to={`/committees/${slug}`}>{title}</Link>
        </div>
      ))}
    </>
  )
}

export default HomeCommittees
