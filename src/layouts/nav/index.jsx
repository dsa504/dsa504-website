import React, { useCallback, useRef } from "react";
import HomeCommittees from "../../components/home-committees";
import useSheet from "react-jss";
import useOnClickOutside from "use-onclickoutside";

const LayoutNav = ({ committees, setIsOpen, classes }) => {
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const ref = useRef(null);
	useOnClickOutside(ref, handleClose);
	return (
		<div ref={ref} className={classes.root}>
			<HomeCommittees onClickLink={handleClose} committees={committees} />
		</div>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;

	return {
		root: {
			transition: ".2s",
			transform: props => (props.isOpen ? "translateX(0)" : "translateX(30vw)"),
			width: "30vw",
			zIndex: 1,
			background: "rgba(0, 0, 0, 0.9)",
			color: "#fff",
			position: "fixed",
			top: 0,
			right: 0,
			height: "100vh",
			padding: [u * 2, u * 4]
		}
	};
};

export default useSheet(styles)(LayoutNav);
