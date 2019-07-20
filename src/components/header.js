import { Link } from "gatsby";
import React from "react";
import useSheet from "react-jss";

const Header = ({ siteTitle, handleToggleNav, classes }) => (
	<header>
		<div className={classes.root}>
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
			display: "flex",
			margin: [0, "auto"],
			padding: [u * 2, u * 4]
		},
		wordmark: {
			margin: 0
		},
		navToggle: { marginLeft: "auto" }
	};
};
export default useSheet(styles)(Header);
