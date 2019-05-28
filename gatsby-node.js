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
        allWordpressPost {
          edges {
            node {
              title
              content
              slug
            }
          }
        }
      }
    `);

  data.allCalendarEvents.edges.forEach(edge => {
    // TODO: move event slug creation to normalizer

    const slug = `${edge.node.start.slugDate}-${kebabCase(edge.node.summary)}`;
    actions.createPage({
      path: `/events/${slug}`,
      component: require.resolve(`./src/components/event-detail/index.jsx`),
      context: { slug, ...edge.node },
    });

    data.allWordpressPost.edges.forEach(edge => {
      actions.createPage({
        path: `/posts/${edge.node.slug}`,
        component: require.resolve(`./src/components/post/index.jsx`),
        context: edge.node
      })
    })

  })
};