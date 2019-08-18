import React from "react";
import useSheet from "react-jss";

const volunteerFormId =
	"1FAIpQLSfqmuqWCrgVfsHpXdiM5nOn0exeO9ZIr9n9CTGsvLbR-It7dQ";

const volunteerFormFields = {
	event: "entry.981133582"
};

const EventDetailActions = ({
	creator,
	htmlLink,
	summaryWithDate,
	classes
}) => {
	return (
		<div className={classes.root}>
			<a className={classes.link} href={htmlLink}>
				Add to your calendar
			</a>
			<br />
			<a
				className={classes.link}
				href={`https://docs.google.com/forms/d/e/${volunteerFormId}/viewform?${
					volunteerFormFields.event
				}=${encodeURIComponent(summaryWithDate)}`}
			>
				Volunteer
			</a>
			<br />
			<a
				className={classes.link}
				href={`mailto:${creator.email}?subject=${encodeURIComponent(
					summaryWithDate
				)}`}
			>
				Contact organizer
			</a>
		</div>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: { display: "flex" },
		link: { padding: [u, u * 2] }
	};
};

export default useSheet(styles)(EventDetailActions);
