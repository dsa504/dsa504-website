import React, { Suspense, lazy, useState, useCallback, useEffect } from 'react';
import injectSheet from 'react-jss';

const Volunteer = lazy(() => import('./volunteer'));

export const volunteerFormId = '1FAIpQLSfqmuqWCrgVfsHpXdiM5nOn0exeO9ZIr9n9CTGsvLbR-It7dQ';

export const volunteerFormFields = {
	EMAIL_ADDRESS: 'entry.706626491',
	PHONE_NUMBER: 'entry.1910289712',
	ZIP_CODE: 'entry.2025282883',
	EVENT_DESCRIPTION: 'entry.981133582',
	VOLUNTEER_ASK: 'entry.1294265320',
};

const EventDetailActions = ({
	creator,
	htmlLink,
	summary,
	monthAndDay,
	summaryWithDate,
	classes,
}) => {
	const [didIntentVolunteer, setDidIntentVolunteer] = useState(false);
	const handleIntendVolunteer = useCallback(() => {
		setDidIntentVolunteer(true);
	}, []);

	const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
	const handleOpenVolunteer = useCallback((e) => {
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
					onFocus={handleIntendVolunteer}
					onMouseEnter={handleIntendVolunteer}
					className={classes.link}
					onClick={handleOpenVolunteer}
					href={`https://docs.google.com/forms/d/e/${volunteerFormId}/viewform?${
						volunteerFormFields.EVENT_DESCRIPTION
					}=${encodeURIComponent(summaryWithDate)}`}
				>
					Volunteer
				</a>
				<br />
				<a
					className={classes.link}
					href={`mailto:${creator.email}?subject=${encodeURIComponent(summaryWithDate)}`}
				>
					Contact organizer
				</a>
			</div>
			{didIntentVolunteer ? (
				<Suspense fallback={<div />}>
					<Volunteer
						{...{
							summary,
							monthAndDay,
							summaryWithDate,
							isVolunteerOpen,
							handleCloseVolunteer,
						}}
					/>
				</Suspense>
			) : null}
		</>
	);
};

const styles = (theme) => {
	const u = theme.spacing.unit;
	return {
		root: { display: 'flex' },
		link: { padding: [u, 0], marginRight: u * 2 },
	};
};

export default injectSheet(styles)(EventDetailActions);
