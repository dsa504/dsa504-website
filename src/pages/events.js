import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Calendar from "../components/calendar";
import useSheet from "react-jss";

const Events = ({ classes }) => {
	const data = useStaticQuery(graphql`
		query CalendarEventQuery {
			allCalendarEvent {
				edges {
					node {
						id
						summary
						creator {
							email
						}
						description
						location
						htmlLink
						start {
							dateTime
						}
						end {
							dateTime
						}
						fields {
							slugDate
							startLocalTime
							endLocalTime
							monthAndDay
							dayOfWeek
						}
					}
				}
			}
		}
	`);

	return (
		<CalendarInner
			classes={classes}
			items={data.allCalendarEvent.edges.map(edge => edge.node)}
		/>
	);
};

const CalendarInner = ({ classes, items }) => (
	<div className={classes.root}>
		<Calendar fullScreen items={items} />
	</div>
);

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: {
			padding: [u * 2, u * 4]
		}
	};
};

export default useSheet(styles)(Events);
