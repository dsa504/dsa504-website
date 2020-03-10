import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Calendar from '../components/calendar';
import injectSheet from 'react-jss';
import { get } from 'lodash';

function nodesToProps(path) {
	const nodes = get(path, 'edges');
	if (!nodes) return [];
	return nodes.map((n) => n.node);
}

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

	return <CalendarInner classes={classes} items={nodesToProps(data.allCalendarEvent)} />;
};

const CalendarInner = ({ classes, items }) => (
	<div className={classes.root}>
		<Calendar fullScreen items={items} />
	</div>
);

const styles = (theme) => {
	const u = theme.spacing.unit;
	return {
		root: {
			padding: [u * 2, u * 4],
		},
	};
};

export default injectSheet(styles)(Events);
