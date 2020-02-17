import React from 'react';
import { map } from 'lodash';
import CalendarEvent from '../calendar-event';

const EventsDay = ({ pageContext }) => (
	<div>
		{map(pageContext, (p) => (
			<CalendarEvent {...p} />
		))}
	</div>
);

export default EventsDay;
