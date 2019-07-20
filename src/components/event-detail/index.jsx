/* eslint-env node */
import React from "react";
import { graphql } from "gatsby";
import SEO from "../seo";
import useSheet from "react-jss";

const EventDetail = ({
	data: {
		calendarEvent: { mapImage, summary, description }
	},
	classes
}) => {
	return (
		<>
			<SEO title={summary} />
			<article className={classes.root}>
				<h1>{summary}</h1>
				<div style={{ display: "flex" }}>
					<div
						style={{
							maxWidth: 400,
							height: 400,
							flex: "1 0 auto",
							backgroundImage: mapImage
								? `url(${mapImage.childImageSharp.fluid.base64})`
								: null,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat"
						}}
					>
						{mapImage ? (
							<img style={{ maxWidth: "100%" }} src={mapImage.publicURL} />
						) : null}
					</div>
					<div
						className={classes.description}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>
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
		description: {
			marginLeft: u * 4
		}
	};
};

export default useSheet(styles)(EventDetail);
