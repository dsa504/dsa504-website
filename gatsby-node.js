/* eslint-env node */
/* eslint-disable import/no-commonjs */
const { kebabCase, groupBy } = require("lodash");
const moment = require("moment-timezone");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const { oneLineTrim } = require("common-tags");

const mapsKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY;
const getMapImageUrl = require("google-maps-image-api-url");

const mapStyle = encodeURIComponent(oneLineTrim`
  element:labels.icon|visibility:off&
  style=element:labels.text.fill|color:0xffffff&
  style=element:labels.text.stroke|visibility:off&
  style=feature:administrative|element:geometry.fill|color:0xc9323b&
  style=feature:administrative|element:geometry.stroke|color:0xc9323b|weight:1.2&
  style=feature:administrative.land_parcel|element:labels.text.stroke|weight:0.01&
  style=feature:administrative.locality|element:geometry.fill|lightness:-1&
  style=feature:administrative.neighborhood|element:labels|inverse_lightness:true&
  style=feature:landscape|element:geometry|color:0xc9323b&
  style=feature:poi|element:geometry|color:0x99282f&
  style=feature:road|element:geometry.stroke|visibility:off&
  style=feature:road.arterial|element:geometry|color:0x99282f&
  style=feature:road.highway|element:geometry.fill|color:0x99282f&
  style=feature:road.highway.controlled_access|element:geometry.stroke|color:0x99282f&
  style=feature:road.local|element:geometry|color:0x99282f&
  style=feature:transit|element:geometry|color:0x99282f&
  style=feature:water|element:geometry|color:0x090228
  `);

exports.createPages = async function({ actions, graphql }) {
	const { data } = await graphql(`
		query {
			allCalendarEvent {
				edges {
					previous {
						summary
						start {
							dateTime
						}
					}
					next {
						summary
						start {
							dateTime
						}
					}
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
			allWordpressPage {
				edges {
					node {
						slug
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
	`);

	const calEvents = data.allCalendarEvent.edges;

	const calDateSlugGroups = groupBy(
		calEvents.map(edge => edge.node),
		"fields.slugDate"
	);

	for (let dateSlugGroup in calDateSlugGroups) {
		actions.createPage({
			path: `/events/${dateSlugGroup}`,
			component: require.resolve("./src/components/day/index.jsx"),
			context: calDateSlugGroups[dateSlugGroup]
		});
	}

	calEvents.forEach(evt => {
		if (evt.node.start && evt.node.fields) {
			const slugDate = evt.node.fields.slugDate;
			const summary = evt.node.summary;
			const slug = `${slugDate}/${kebabCase(summary)}`;

			actions.createPage({
				path: `/events/${slug}`,
				component: require.resolve(`./src/components/event-detail/index.jsx`),
				context: {
					id: evt.node.id,
					previous: evt.previous,
					next: evt.next
				}
			});
		}
	});

	const wpPosts = data.allWordpressPost.edges;
	wpPosts.forEach(post => {
		actions.createPage({
			path: `/posts/${post.node.slugYear}/${post.node.slugMonth}/${post.node.slug}`,
			component: require.resolve(`./src/components/wordpress-post/index.jsx`),
			context: { slug: post.node.slug }
		});
	});
	const wpPages = data.allWordpressPage.edges;
	wpPages.forEach(page => {
		if (page.node.slug !== "events") {
			actions.createPage({
				path: `/${page.node.slug}`,
				component: require.resolve(`./src/components/wordpress-page/index.jsx`),
				context: { slug: page.node.slug }
			});
		}
	});

	if (
		data.allWordpressWpCommittee &&
		data.allWordpressWpCommittee.edges.length
	) {
		actions.createPage({
			path: `/committees`,
			component: require.resolve(`./src/components/committees.jsx`)
		});

		data.allWordpressWpCommittee.edges.forEach(({ node }) => {
			actions.createPage({
				path: `/committees/${node.slug}`,
				component: require.resolve(`./src/components/committee.jsx`),
				context: node
			});
		});
	}
};

async function onCreateNode({
	node,
	store,
	cache,
	createNodeId,
	actions: { createNode, createNodeField }
}) {
	if (node.internal.type === "CalendarEvent" && node.start) {
		const startMoment = moment(node.start.dateTime).tz("America/Chicago");
		const endMoment = moment(node.end.dateTime).tz("America/Chicago");

		const slugDate = startMoment.format("YYYY-MM-DD");

		createNodeField({
			node,
			name: "slugDate",
			value: slugDate
		});

		createNodeField({
			node,
			name: "monthAndDay",
			value: startMoment.format("MMMM Do")
		});

		createNodeField({
			node,
			name: "dayOfWeek",
			value: startMoment.format("dddd")
		});

		createNodeField({
			node,
			name: "startLocalTime",
			value: startMoment.format("h:mm A")
		});

		createNodeField({
			node,
			name: "endLocalTime",
			value: endMoment.format("h:mm A")
		});

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
	return;
}

exports.onCreateNode = onCreateNode;

exports.onCreatePage = ({ page, actions }) => {
	const { createPage } = actions;

	if (page.path === "/") {
		page.context.layout = "home";
		createPage(page);
	}
};
