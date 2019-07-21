import React from "react";
import { Link } from "gatsby";
import useSheet from "react-jss";

const NavSectionHeader = ({
	linkTo,
	onClickLink,
	linkProps = {},
	children,
	classes,
	...props
}) => {
	return (
		<h4 className={classes.root} {...props}>
			<Link to={linkTo} onClick={onClickLink} {...linkProps}>
				{children}
			</Link>
		</h4>
	);
};

const styles = {
	root: {
		color: "#fff",
		margin: 0
	}
};

export default useSheet(styles)(NavSectionHeader);
