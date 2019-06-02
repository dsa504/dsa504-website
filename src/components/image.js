import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ imgName, ...props }) =>
  console.log({ imgName }) || (
    <StaticQuery
      query={graphql`
        query {
          allImageSharp {
            edges {
              node {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                  originalName
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image = data.allImageSharp.edges.find(
          edge =>
            console.log({
              originalName: edge.node.fluid.originalName,
              imgName,
            }) || edge.node.fluid.originalName === imgName
        )
        if (!image) {
          console.log("no match")
          return null
        }
        return <Img fluid={image.node.fluid} {...props} />
      }}
    />
  )
export default Image
