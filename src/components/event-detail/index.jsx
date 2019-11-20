import React from "react";
import { graphql, Link } from "gatsby";
import SEO from "../seo";
import useSheet from "react-jss";
import { kebabCase } from "lodash";
import EventDetailPagination from "./pagination";
import EventDetailActions from "./actions";
import EventDetailMapImage from "./map-image";

const EventDetail = ({
	data: {
		calendarEvent: {
			fields: { monthAndDay, slugDate, dayOfWeek },
			creator,
			htmlLink,
			mapImage,
			summary,
			description
		}
	},
	pageContext: { previous, next },
	classes
}) => {
	const summaryWithDate = `${monthAndDay} ${summary}`;

	// have to do this gross shit because we don't have the slug in the query at the time of node creation
	const prevSlug =
		previous && previous.start && previous.start.dateTime
			? `/events/${previous.start.dateTime.split("T")[0]}/${kebabCase(
					previous.summary
			  )}`
			: null;

	const nextSlug =
		next && next.start && next.start.dateTime
			? `/events/${next.start.dateTime.split("T")[0]}/${kebabCase(
					next.summary
			  )}`
			: null;

	return (
		<>
			<SEO title={summary} prevLink={prevSlug} nextLink={nextSlug} />
			<article className={classes.root}>
				<h1>
					{summary} <br />{" "}
					<small>
						<Link to={`/events/${slugDate}`}>
							{dayOfWeek} {monthAndDay}
						</Link>
					</small>
				</h1>
				<br />
				<EventDetailActions
					{...{ creator, htmlLink, summaryWithDate, monthAndDay, summary }}
				/>
				<div style={{ display: "flex" }}>
					<EventDetailMapImage {...{ mapImage }} />
					<div
						className={classes.description}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>
				<br />
				<br />
				<EventDetailPagination {...{ previous, next, prevSlug, nextSlug }} />
			</article>
		</>
	);
};

export const pageQuery = graphql`
	query CalEvtById($id: String!) {
		calendarEvent(id: { eq: $id }) {
			id
			summary
			description
			htmlLink
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
			mapImage {
				publicURL
				childImageSharp {
					fluid(maxWidth: 400) {
						base64
					}
				}
			}
			fields {
				startLocalTime
				endLocalTime
				slugDate
				monthAndDay
				dayOfWeek
			}
		}
	}
`;

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: {
			padding: [u * 2, u * 4]
		},
		description: {}
	};
};

export default useSheet(styles)(EventDetail);
