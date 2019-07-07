import React from "react";
import { graphql } from "gatsby";
import SEO from "../seo";
import useSheet from "react-jss";

const Page = ({
	data: {
		wordpressPage: { content, title }
	},
	classes
}) => {
	return (
		<>
			<SEO title={title} />
			<article className={classes.root}>
				<h1 dangerouslySetInnerHTML={{ __html: title }} />
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</article>
		</>
	);
};

export const pageQuery = graphql`
	query WordpressPageBySlug($slug: String!) {
		wordpressPage(slug: { eq: $slug }) {
			date(formatString: "MMMM Do, YYYY")
			content
			title
		}
	}
`;
const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: {
			padding: [u * 2, u * 4]
		}
	};
};

export default useSheet(styles)(Page);
