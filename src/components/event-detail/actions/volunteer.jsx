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
import { createMuiTheme, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { red, black } from "@material-ui/core/colors";

import { volunteerFormId, volunteerFormFields } from ".";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const theme = createMuiTheme({
	palette: { primary: red, secondary: black }
});

const Volunteer = ({
	summaryWithDate,
	isVolunteerOpen,
	handleCloseVolunteer
}) => {
	const muiTheme = useTheme();
	const fullScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				fullScreen={fullScreen}
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
						<Button size="large" onClick={handleCloseVolunteer}>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="contained"
							size="large"
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
