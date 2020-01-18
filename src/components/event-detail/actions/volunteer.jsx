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
	DialogActions,
	Typography
} from "@material-ui/core";
import { createMuiTheme, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { red, grey } from "@material-ui/core/colors";

import { volunteerFormId, volunteerFormFields } from ".";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const theme = createMuiTheme({
	palette: { primary: red, secondary: grey }
});

const Volunteer = ({
	summary,
	monthAndDay,
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
					<DialogTitle disableTypography>
						<Typography variant="subtitle1">{summary}</Typography>

						<Typography variant="caption">{monthAndDay}</Typography>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<input
								type="hidden"
								name={volunteerFormFields.EVENT_DESCRIPTION}
								value={summaryWithDate}
							/>
							<FormGroup>
								<TextField margin="dense" fullWidth label="Email address" />
								<TextField
									type="tel"
									margin="dense"
									fullWidth
									label="Phone number"
								/>
								<TextField margin="dense" fullWidth label="ZIP code" />
								<TextField
									margin="dense"
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
