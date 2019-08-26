import React, { Suspense, lazy, useState, useCallback } from "react";
import useSheet from "react-jss";

const Volunteer = lazy(() => import("./volunteer.jsx"));

// const volunteerFormId =
// 	"1FAIpQLSfqmuqWCrgVfsHpXdiM5nOn0exeO9ZIr9n9CTGsvLbR-It7dQ";

// const volunteerFormFields = {
// 	event: "entry.981133582"
// };

const EventDetailActions = ({
	creator,
	htmlLink,
	summaryWithDate,
	classes
}) => {
	const [didIntentVolunteer, setDidIntentVolunteer] = useState(false);
	const handleIntendVolunteer = useCallback(() => {
		setDidIntentVolunteer(true);
	}, []);

	const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
	const handleOpenVolunteer = useCallback(() => {
		setIsVolunteerOpen(true);
	}, []);
	const handleCloseVolunteer = useCallback(() => {
		setIsVolunteerOpen(false);
	}, []);

	return (
		<>
			<div className={classes.root}>
				<a className={classes.link} href={htmlLink}>
					Add to your calendar
				</a>
				<br />
				<a
					href="#"
					onMouseEnter={handleIntendVolunteer}
					className={classes.link}
					onClick={handleOpenVolunteer}
					// href={`https://docs.google.com/forms/d/e/${volunteerFormId}/viewform?${
					// 	volunteerFormFields.event
					// }=${encodeURIComponent(summaryWithDate)}`}
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
			{didIntentVolunteer ? (
				<Suspense fallback={<div />}>
					<Volunteer {...{ isVolunteerOpen, handleCloseVolunteer }} />
				</Suspense>
			) : null}
		</>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: { display: "flex" },
		link: { padding: [u, 0], marginRight: u * 2 }
	};
};

export default useSheet(styles)(EventDetailActions);
