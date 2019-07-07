import React from "react";
import HomeCommittees from "../../components/home-committees";
import useSheet from "react-jss";

const LayoutNav = ({ committees, classes }) => {
	return (
		<div className={classes.root}>
			<HomeCommittees committees={committees} />
		</div>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;

	return {
		root: {
			transform: "translateX(30vw)",
			width: "30vw",
			zIndex: 1,
			background: "rgba(0, 0, 0, 0.9)",
			color: "#fff",
			position: "fixed",
			top: 0,
			right: 0,
			bottom: 0,
			padding: [u * 2, u * 4]
		}
	};
};

export default useSheet(styles)(LayoutNav);
