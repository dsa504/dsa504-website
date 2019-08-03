import React from "react";
import HomeCalendarEvent from "./event";

const HomeCalendar = ({ events }) => {
	return (
		<>
			{events.map((evt, idx) => {
				const previous = events[idx - 1];
				return <HomeCalendarEvent key={evt.id} {...evt} {...{ previous }} />;
			})}
		</>
	);
};

export default HomeCalendar;
