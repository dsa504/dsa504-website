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
              summary
            }
          }
        }
      }
    `)
    data.allCalendarEvents.edges.forEach(edge => {
        console.log("creating event detail page")
        const slug = kebabCase(edge.node.summary);
        actions.createPage({
            path: `/events/${slug}`,
            component: require.resolve(`./src/components/event-detail/index.jsx`),
            context: { slug: slug, summary: edge.node.summary },
        })
    })
};