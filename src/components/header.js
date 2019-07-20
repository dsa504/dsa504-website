import { Link } from "gatsby";
import React from "react";
import useSheet from "react-jss";

const Header = ({ siteTitle, handleToggleNav, classes }) => (
	<header className={classes.root}>
		<div className={classes.inner}>
			<h1 className={classes.wordmark}>
				<Link to="/">{siteTitle}</Link>
			</h1>
			<button className={classes.navToggle} onClick={handleToggleNav}>
				Toggle nav
			</button>
		</div>
	</header>
);

Header.defaultProps = {
	siteTitle: ``
};

const styles = theme => {
	const u = theme.spacing.unit;

	return {
		root: {
			position: "fixed",
			top: 0,
			width: "100%",
			zIndex: theme.zIndex.navbar
		},
		inner: {
			display: "flex",
			margin: [0, "auto"],
			padding: [u * 2, u * 4],
			background: theme.palette.black
		},
		wordmark: {
			margin: 0
		},
		navToggle: { marginLeft: "auto" }
	};
};
export default useSheet(styles)(Header);
