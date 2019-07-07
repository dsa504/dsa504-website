import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Calendar from "../components/calendar";

const Events = () => {
	return (
		<StaticQuery
			query={graphql`
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
			`}
			render={CalendarInner}
		/>
	);
};

const CalendarInner = props => (
	<Calendar
		fullScreen
		items={props.allCalendarEvent.edges.map(edge => edge.node)}
	/>
);

export default Events;
