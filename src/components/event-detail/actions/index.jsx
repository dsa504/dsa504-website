import React, { Suspense, lazy, useState, useCallback, useEffect } from "react";
import useSheet from "react-jss";

const Volunteer = lazy(() => import("./volunteer.jsx"));

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
	const handleOpenVolunteer = useCallback(e => {
		e && e.preventDefault && e.preventDefault();
		setIsVolunteerOpen(true);
	}, []);
	const handleCloseVolunteer = useCallback(() => {
		setIsVolunteerOpen(false);
	}, []);

	// Immediately lazy load modal on mount/idle
	useEffect(() => {
		handleIntendVolunteer();
	}, [handleIntendVolunteer]);

	return (
		<>
			<div className={classes.root}>
				<a className={classes.link} href={htmlLink}>
					Add to your calendar
				</a>
				<br />
				<a
					href="#"
					onFocus={handleIntendVolunteer}
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
					<Volunteer
						{...{ summaryWithDate, isVolunteerOpen, handleCloseVolunteer }}
					/>
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
