/* eslint-env node */
const { kebabCase, groupBy } = require("lodash")
const moment = require("moment-timezone")
const { createRemoteFileNode } = require("gatsby-source-filesystem");

const mapsKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY;
const getMapImageUrl = require("google-maps-image-api-url");

const mapStyle =
  "element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0xffffff&style=element:labels.text.stroke%7Cvisibility:off&style=feature:administrative%7Celement:geometry.fill%7Ccolor:0xc9323b&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9323b%7Cweight:1.2&style=feature:administrative.land_parcel%7Celement:labels.text.stroke%7Cweight:0.01&style=feature:administrative.locality%7Celement:geometry.fill%7Clightness:-1&style=feature:administrative.neighborhood%7Celement:labels.text.fill%7Csaturation:0%7Clightness:0&style=feature:administrative.neighborhood%7Celement:labels.text.stroke%7Cweight:0.01&style=feature:landscape%7Celement:geometry%7Ccolor:0xc9323b&style=feature:poi%7Celement:geometry%7Ccolor:0x99282f&style=feature:road%7Celement:geometry.stroke%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x99282f&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0x99282f&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0x99282f&style=feature:road.local%7Celement:geometry%7Ccolor:0x99282f&style=feature:transit%7Celement:geometry%7Ccolor:0x99282f&style=feature:water%7Celement:geometry%7Ccolor:0x090228";


exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allCalendarEvent {
        edges {
          node {
            id
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

  const calEvents = data.allCalendarEvent.edges;

  const calDateSlugGroups = groupBy(calEvents.map(edge => edge.node), "fields.slugDate")

  for (let dateSlugGroup in calDateSlugGroups) {
    actions.createPage({
      path: `/events/${dateSlugGroup}`,
      component: require.resolve("./src/components/day/index.jsx"),
      context: calDateSlugGroups[dateSlugGroup],
    })
  }

  calEvents.forEach(evt => {
    if (evt.node.start && evt.node.fields) {
      const slugDate = evt.node.fields.slugDate;
      const summary = evt.node.summary;
      const slug = `${slugDate}/${kebabCase(summary)}`;


      actions.createPage({
        path: `/events/${slug}`,
        component: require.resolve(`./src/components/event-detail/index.jsx`),
        context: { id: evt.node.id },
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
      path: `/committees/${node.slug}`,
      component: require.resolve(`./src/components/committee.jsx`),
      context: node,
    })
  })
}

async function onCreateNode({ node,
  store,
  cache,
  createNodeId,
  actions: { createNode, createNodeField }
}) {
  if (node.internal.type === "CalendarEvent" && node.start) {
    const startMoment = moment(node.start.dateTime).tz("America/Chicago")
    const endMoment = moment(node.end.dateTime).tz("America/Chicago")

    const slugDate = startMoment.format("YYYY-MM-DD")

    createNodeField({
      node,
      name: "slugDate",
      value: slugDate,
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

    if (node.location) {
      const mapUrl = getMapImageUrl({
        type: "staticmap",
        size: "400x400",
        zoom: 12,
        scale: 2,
        center: node.location,
        key: mapsKey,
        markers: `color:0x222222|label:X|${node.location}`,
        style: mapStyle,
        format: "JPEG"
      });

      const fileNode = await createRemoteFileNode({
        url: mapUrl,
        store,
        cache,
        createNode,
        createNodeId,
        name: `${slugDate}-${kebabCase(node.summary)}-map-image`,
        ext: ".jpg"
      });

      if (fileNode) {
        node.mapImage___NODE = fileNode.id;
      }
    }
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
