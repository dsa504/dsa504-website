import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import HomeCalendar from "../components/home-calendar"
import HomePost from "../components/home-post"
import HomeCommittees from "../components/home-committees"
import useSheet from "react-jss"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <StaticQuery
      query={graphql`
        query HomeQuery {
          latestPost: allWordpressPost(limit: 1) {
            edges {
              node {
                title
                content
                slug
                slugYear: date(formatString: "YYYY")
                slugMonth: date(formatString: "MM")
              }
            }
          }
          restPosts: allWordpressPost(skip: 1, limit: 8) {
            edges {
              node {
                title
                slug
                excerpt
                slugYear: date(formatString: "YYYY")
                slugMonth: date(formatString: "MM")
              }
            }
          }

          allWordpressWpCommittee {
            edges {
              node {
                slug
                title
              }
            }
          }

          allCalendarEvent(limit: 10) {
            edges {
              node {
                summary
                id
                fields {
                  monthAndDay
                  slugDate
                  startLocalTime
                }
              }
            }
          }
        }
      `}
      // Expects a function component not a class which the react-jss HOC makes it,
      // and the hook-based API doesn't seem to work here yet so we're stuck with this
      render={HomeRootWrapper}
    />
  </>
)

const _HomeRoot = ({
  latestPost,
  restPosts,
  allWordpressWpCommittee,
  allCalendarEvent,
  classes,
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.upcoming}>
        <div>
          <HomeCalendar
            events={allCalendarEvent.edges.map(edge => edge.node)}
          />
          <br />
          <br />
        </div>
        <div>
          <HomeCommittees
            committees={allWordpressWpCommittee.edges.map(edge => edge.node)}
          />
        </div>
      </div>
      <div className={classes.posts}>
        <HomePost {...latestPost.edges[0].node} />
        {restPosts.edges.map(({ node }) => (
          <HomePost key={node.slug} {...node} />
        ))}
      </div>
    </div>
  )
}

const styles = {
  root: {
    "&:after": {
      display: "table",
      content: '""',
      clear: "both",
    },
  },
  column: {
    padding: ["1em", "2em"],
  },
  posts: {
    composes: "$column",
    "& > article": {
      paddingBottom: "2em",
    },
    "@media screen and (min-width: 65em)": {
      "& > article:not(:first-child)": {
        display: "inline-block",
        verticalAlign: "top",
        width: "50%",
        paddingRight: "2em",
      },
    },
  },
  upcoming: {
    composes: "$column",
    "@media screen and (min-width: 45em)": {
      columns: 2,
      "& > div": {
        breakInside: "avoid",
      },
    },
    "@media screen and (min-width: 65em)": {
      float: "right",
      columns: 1,
    },
    "@media screen and (min-width: 105em)": {},
  },
}

const HomeRoot = useSheet(styles)(_HomeRoot)

const HomeRootWrapper = props => <HomeRoot {...props} />

export default IndexPage
