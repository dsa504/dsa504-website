import React, { Fragment as F } from "react";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import useSheet from "react-jss";

const HomeCalendar = ({ events, classes }) => {
	return (
		<div>
			<Link to="/events">
				<h3>Upcoming Events</h3>
			</Link>
			{events.map(({ id, fields, summary }, idx) =>
				id && id !== "dummy" && fields ? (
					<F key={id}>
						{(fields.monthAndDay &&
							(!events[idx - 1] || events[idx - 1].id === "dummy")) ||
						(events[idx - 1] &&
							events[idx - 1].fields &&
							events[idx - 1].fields.monthAndDay !== fields.monthAndDay) ? (
							<Link className={classes.date} to={`/events/${fields.slugDate}`}>
								{fields.monthAndDay}
							</Link>
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
								<div style={{ marginLeft: "auto" }}>
									{fields.startLocalTime}
								</div>
							</div>
						</Link>
					</F>
				) : null
			)}
		</div>
	);
};

const styles = theme => {
	return {
		date: {
			color: theme.palette.black
		}
	};
};

export default useSheet(styles)(HomeCalendar);
