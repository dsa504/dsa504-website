const { kebabCase } = require("lodash")
const moment = require("moment-timezone")

exports.createPages = async function({ actions, graphql }) {
  const { data, ...rest } = await graphql(`
    query {
      allCalendarEvents {
        edges {
          node {
            summary
            start {
              dateTime
            }
            location
            description
            fields {
              startLocalTime
              endLocalTime
              monthAndDay
              slugDate
            }
          }
        }
      }
      allWordpressPost(limit: 10) {
        edges {
          node {
            title
            content
            slug
          }
        }
      }
    }
  `)

  data.allCalendarEvents.edges.forEach(edge => {
    // TODO: move event slug creation to normalizer

    if (edge.node.start && edge.node.fields) {
      const slugDate = edge.node.fields.slugDate
      const summary = edge.node.summary
      const slug = `${slugDate}-${kebabCase(summary)}`

      actions.createPage({
        path: `/events/${slug}`,
        component: require.resolve(`./src/components/event-detail/index.jsx`),
        context: { slug, ...edge.node },
      })
    }
  })

  data.allWordpressPost.edges.forEach(edge => {
    actions.createPage({
      path: `/posts/${edge.node.slug}`,
      component: require.resolve(`./src/components/post/index.jsx`),
      context: edge.node,
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
