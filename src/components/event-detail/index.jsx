import React from "react";
import { graphql, Link } from "gatsby";
import SEO from "../seo";
import useSheet from "react-jss";
import { kebabCase } from "lodash";
import EventDetailPagination from "./pagination";

const volunteerFormId =
	"1FAIpQLSfqmuqWCrgVfsHpXdiM5nOn0exeO9ZIr9n9CTGsvLbR-It7dQ";

const volunteerFormFields = {
	event: "entry.981133582"
};

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
		previous && previous.start
			? `/events/${previous.start.dateTime.split("T")[0]}/${kebabCase(
					previous.summary
			  )}`
			: null;

	const nextSlug =
		next && next.start
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
				<a className={classes.link} href={htmlLink}>
					Add to your calendar
				</a>
				<br />
				<a
					className={classes.link}
					href={`https://docs.google.com/forms/d/e/${volunteerFormId}/viewform?${
						volunteerFormFields.event
					}=${encodeURIComponent(summaryWithDate)}`}
				>
					Volunteer
				</a>
				<br />
				<a
					className={classes.link}
					href={`mailto:${creator.email}?subject=${encodeURIComponent(
						summaryWithDate
					)}`}
				>
					Contact organizer
				</a>
				<div style={{ display: "flex" }}>
					{mapImage ? (
						<div
							className={classes.mapImage}
							style={{
								backgroundImage: mapImage
									? `url(${mapImage.childImageSharp.fluid.base64})`
									: null
							}}
						>
							<img style={{ maxWidth: "100%" }} src={mapImage.publicURL} />
						</div>
					) : null}
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
		mapImage: {
			maxWidth: u * 50,
			height: u * 50,
			flex: "1 0 auto",
			marginRight: u * 4,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat"
		},
		description: {}
	};
};

export default useSheet(styles)(EventDetail);
