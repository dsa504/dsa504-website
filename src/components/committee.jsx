import React from "react";
import SEO from "./seo";
import injectSheet from "react-jss";

const Committee = ({ pageContext, classes }) => (
	<>
		<SEO title={pageContext.title} />
		<div className={classes.root}>
			<h1>{pageContext.title}</h1>
		</div>
	</>
);

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: {
			padding: [u * 2, u * 4]
		}
	};
};

export default injectSheet(styles)(Committee);
