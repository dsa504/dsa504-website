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
