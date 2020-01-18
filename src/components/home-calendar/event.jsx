import React from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import injectSheet from "react-jss";

const HomeCalendarEvent = ({ fields, summary, previous, classes }) => {
	const hasPrevious = !!(previous && previous.fields);
	const showDate =
		!hasPrevious ||
		(hasPrevious && previous.fields.monthAndDay !== fields.monthAndDay);
	return (
		<>
			{showDate && hasPrevious ? <br /> : null}
			{showDate ? (
				<>
					<Link className={classes.date} to={`/events/${fields.slugDate}`}>
						{fields.monthAndDay}
					</Link>
				</>
			) : null}
			<Link to={`/events/${fields.slugDate}/${kebabCase(summary)}`}>
				<div style={{ display: "flex" }}>
					<div
						style={{
							whiteSpace: "nowrap",
							maxWidth: "18em",
							overflow: "hidden",
							textOverflow: "ellipsis"
						}}
					>
						{summary}
					</div>
					<div style={{ marginLeft: "auto" }}>{fields.startLocalTime}</div>
				</div>
			</Link>
		</>
	);
};

const styles = theme => {
	return {
		date: {
			color: theme.palette.black
		}
	};
};

export default injectSheet(styles)(HomeCalendarEvent);
