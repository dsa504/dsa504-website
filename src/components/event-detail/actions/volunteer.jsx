import React from "react";
import {
	Slide,
	Dialog,
	DialogContent,
	DialogContentText,
	TextField,
	DialogTitle,
	Button,
	FormGroup,
	DialogActions
} from "@material-ui/core";

import { volunteerFormId, volunteerFormFields } from ".";

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
			<form action={`https://docs.google.com/forms/d/e/${volunteerFormId}/`}>
				<DialogTitle>Volunteer: {summaryWithDate}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<input
							type="hidden"
							name={volunteerFormFields.event}
							value={summaryWithDate}
						/>
						<FormGroup>
							<TextField margin="normal" fullWidth label="Email address" />
							<TextField margin="normal" fullWidth label="Phone number" />
							<TextField margin="normal" fullWidth label="ZIP code" />
							<TextField
								margin="normal"
								fullWidth
								label="How can you pitch in?"
							/>
						</FormGroup>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						variant="outlined"
						size="large"
						fullWidth
						type="submit"
					>
						Volunteer me!
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default Volunteer;
