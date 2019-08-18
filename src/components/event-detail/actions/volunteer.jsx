import React from "react";
import {
	Slide,
	Dialog,
	DialogContent,
	DialogContentText
} from "@material-ui/core";

const Volunteer = ({ isVolunteerOpen, handleCloseVolunteer }) => {
	return (
		<Dialog
			TransitionComponent={Slide}
			open={isVolunteerOpen}
			onClose={handleCloseVolunteer}
		>
			<DialogContent>
				<DialogContentText>Hoot</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default Volunteer;
