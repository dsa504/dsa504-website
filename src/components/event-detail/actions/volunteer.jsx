import React from "react";
import {
	Slide,
	Dialog,
	DialogContent,
	DialogContentText,
	TextField,
	DialogTitle
} from "@material-ui/core";

const volunteerFormId =
	"1FAIpQLSfqmuqWCrgVfsHpXdiM5nOn0exeO9ZIr9n9CTGsvLbR-It7dQ";

const volunteerFormFields = {
	event: "entry.981133582"
};

const Volunteer = ({
	summaryWithDate,
	isVolunteerOpen,
	handleCloseVolunteer
}) => {
	return (
		<Dialog
			TransitionComponent={Slide}
			open={isVolunteerOpen}
			onClose={handleCloseVolunteer}
		>
			<DialogTitle>Volunteer: {summaryWithDate}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<form
						action={`https://docs.google.com/forms/d/e/${volunteerFormId}/`}
					>
						<input
							type="hidden"
							name={volunteerFormFields.event}
							value={summaryWithDate}
						/>
						<TextField label="Flurfo" />
					</form>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default Volunteer;
