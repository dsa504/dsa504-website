import React from "react";
import { Link } from "gatsby";
import HomeCalendarEvent from "./event";

const HomeCalendar = ({ events }) => {
	return (
		<div>
			<Link to="/events">
				<h3>Upcoming Events</h3>
			</Link>
			{events.map((evt, idx) => {
				const previous = events[idx - 1];
				return <HomeCalendarEvent key={evt.id} {...evt} {...{ previous }} />;
			})}
		</div>
	);
};

export default HomeCalendar;
