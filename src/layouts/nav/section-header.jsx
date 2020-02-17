import React from 'react';
import { Link } from 'gatsby';
import injectSheet from 'react-jss';

const NavSectionHeader = ({ linkTo, linkProps = {}, children, classes, ...props }) => {
	return (
		<h4 className={classes.root} {...props}>
			<Link to={linkTo} {...linkProps}>
				{children}
			</Link>
		</h4>
	);
};

const styles = {
	root: {
		color: '#fff',
		margin: 0,
	},
};

export default injectSheet(styles)(NavSectionHeader);
