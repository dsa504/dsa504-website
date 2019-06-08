const { kebabCase, groupBy } = require("lodash")
const moment = require("moment-timezone")

exports.createPages = async function ({ actions, graphql }) {
  const { data, ...rest } = await graphql(`
    query {
      allCalendarEvents {
        edges {
          node {
            summary
            creator {
              email
            }
            start {
              dateTime
            }
            end {
              dateTime
            }
            location
            description
            fields {
              startLocalTime
              endLocalTime
              monthAndDay
              slugDate
              dayOfWeek
            }
          }
        }
      }
      allWordpressPost(limit: 10) {
        edges {
          node {
            slug
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
    }
  `)

  const calEvents = data.allCalendarEvents.edges.map(edge => edge.node)

  const calDateSlugGroups = groupBy(calEvents, "fields.slugDate")

  for (let dateSlugGroup in calDateSlugGroups) {
    actions.createPage({
      path: `/events/${dateSlugGroup}`,
      component: require.resolve("./src/components/day/index.jsx"),
      context: calDateSlugGroups[dateSlugGroup],
    })
  }

  calEvents.forEach(node => {
    if (node.start && node.fields) {
      const slugDate = node.fields.slugDate
      const summary = node.summary
      const slug = `${slugDate}/${kebabCase(summary)}`

      actions.createPage({
        path: `/events/${slug}`,
        component: require.resolve(`./src/components/event-detail/index.jsx`),
        context: { slug, ...node },
      })
    }
  })

  const wpPosts = data.allWordpressPost.edges;
  wpPosts.forEach(post => {
    actions.createPage({
      path: `/posts/${post.node.slugYear}/${post.node.slugMonth}/${
        post.node.slug
        }`,
      component: require.resolve(`./src/components/post/index.jsx`),
      context: { slug: post.node.slug }
    });
  });


  data.allWordpressWpCommittee.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: require.resolve(`./src/components/committee.jsx`),
      context: node,
    })
  })
}

async function onCreateNode({ node, actions: { createNodeField } }) {
  if (node.internal.type === "CalendarEvents" && node.start) {
    const startMoment = moment(node.start.dateTime).tz("America/Chicago")
    const endMoment = moment(node.end.dateTime).tz("America/Chicago")

    createNodeField({
      node,
      name: "slugDate",
      value: startMoment.format("YYYY-MM-DD"),
    })

    createNodeField({
      node,
      name: "monthAndDay",
      value: startMoment.format("MMMM Do"),
    })

    createNodeField({
      node,
      name: "dayOfWeek",
      value: startMoment.format("dddd"),
    })

    createNodeField({
      node,
      name: "startLocalTime",
      value: startMoment.format("h:mm A"),
    })

    createNodeField({
      node,
      name: "endLocalTime",
      value: endMoment.format("h:mm A"),
    })
  }
  return
}

exports.onCreateNode = onCreateNode

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === "/") {
    page.context.layout = "home"
    createPage(page)
  }
}
