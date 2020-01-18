import { Link } from "gatsby";
import React from "react";
import injectSheet from "react-jss";

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
			transition: ".2s",
			position: "fixed",
			top: 0,
			width: "100%",
			zIndex: theme.zIndex.navbar,
			boxShadow: "12px 0 24px 0 rgba(0,0,0,0.25)",
			background: "#000"
		},
		inner: {
			transition: ".2s",
			display: "flex",
			margin: [0, "auto"],
			padding: [u * 2, u * 4],
			background: theme.palette.red,
			opacity: props => (props.isNavOpen ? 0.6 : 1),
			"&, & a": {
				color: "#fff"
			}
		},
		wordmark: {
			margin: 0
		},
		navToggle: { marginLeft: "auto" }
	};
};
export default injectSheet(styles)(Header);
