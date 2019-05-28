const { kebabCase } = require("lodash");

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `calendarEvents`) {
    //      console.log(createFilePath({ node, getNode, basePath: `pages` }))
  }
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
      query {
        allCalendarEvents {
          edges {
            node {
              summary,
              start {
                slugDate: dateTime(formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    `)
  data.allCalendarEvents.edges.forEach(edge => {
    // TODO: move event slug creation to normalizer
    if (edge.node.start) {
      const slug = `${edge.node.start.slugDate}-${kebabCase(edge.node.summary)}`;
      console.log("createPage slug", slug);
      actions.createPage({
        path: `/events/${slug}`,
        component: require.resolve(`./src/components/event-detail/index.jsx`),
        context: { slug: slug, summary: edge.node.summary },
      })
    } else {
      console.log(edge.node)
    }
  })
};