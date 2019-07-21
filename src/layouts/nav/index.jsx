import React, { useCallback, useRef } from "react";
import HomeCommittees from "../../components/home-committees";
import useSheet from "react-jss";
import useOnClickOutside from "use-onclickoutside";
import { Link } from "gatsby";
import NavSectionHeader from "./section-header";

const LayoutNav = ({ committees, setIsOpen, classes }) => {
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const ref = useRef(null);
	useOnClickOutside(ref, handleClose);
	return (
		<div ref={ref} className={classes.root}>
			<Link to="/events" onClick={handleClose}>
				Upcoming Events
			</Link>
			<br />
			<br />
			<NavSectionHeader linkTo="/committees" onClickLink={handleClose}>
				Committees &amp; Caucuses
			</NavSectionHeader>
			<HomeCommittees onClickLink={handleClose} committees={committees} />
		</div>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;

	return {
		root: {
			zIndex: theme.zIndex.navbar + 1,
			transition: ".2s",
			transform: props => (props.isOpen ? "translateX(0)" : "translateX(30vw)"),
			boxShadow: props =>
				props.isOpen
					? "-12px 0 24px 0 rgba(0,0,0,0.25)"
					: "36px 0 24px 0 rgba(0,0,0,0)",
			width: "30vw",
			background: theme.palette.red,
			"&, & a": {
				color: "#fff"
			},
			position: "fixed",
			top: 0,
			right: 0,
			height: "100vh",
			overflowY: "auto",
			padding: [u * 2, u * 4]
		}
	};
};

export default useSheet(styles)(LayoutNav);
