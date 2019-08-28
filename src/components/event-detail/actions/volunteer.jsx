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
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { red, black } from "@material-ui/core/colors";

import { volunteerFormId, volunteerFormFields } from ".";

const theme = createMuiTheme({
	palette: { primary: red, secondary: black }
});

const Volunteer = ({
	summaryWithDate,
	isVolunteerOpen,
	handleCloseVolunteer
}) => {
	return (
		<ThemeProvider theme={theme}>
			<Dialog
				TransitionComponent={Slide}
				open={isVolunteerOpen}
				onClose={handleCloseVolunteer}
			>
				<form action={`https://docs.google.com/forms/d/e/${volunteerFormId}/`}>
					<DialogTitle>{summaryWithDate}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<input
								type="hidden"
								name={volunteerFormFields.EVENT_DESCRIPTION}
								value={summaryWithDate}
							/>
							<FormGroup>
								<TextField margin="normal" fullWidth label="Email address" />
								<TextField
									type="tel"
									margin="normal"
									fullWidth
									label="Phone number"
								/>
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
							variant="contained"
							size="large"
							fullWidth
							type="submit"
						>
							Volunteer me!
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</ThemeProvider>
	);
};

export default Volunteer;
