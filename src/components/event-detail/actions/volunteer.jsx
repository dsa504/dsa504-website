import React from "react";
import {
	Slide,
	Dialog,
	DialogContent,
	DialogContentText,
	TextField
} from "@material-ui/core";

const Volunteer = ({ isVolunteerOpen, handleCloseVolunteer }) => {
	return (
		<Dialog
			TransitionComponent={Slide}
			open={isVolunteerOpen}
			onClose={handleCloseVolunteer}
		>
			<DialogContent>
				<DialogContentText>
					<TextField label="Flurf" />
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default Volunteer;
