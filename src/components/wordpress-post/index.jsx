import React from "react";
import { graphql } from "gatsby";
import SEO from "../seo";
import injectSheet from "react-jss";

const Post = ({
	data: {
		wordpressPost: { content, title, date }
	},
	classes
}) => {
	return (
		<>
			<SEO title={title} />
			<article className={classes.root}>
				<h1 dangerouslySetInnerHTML={{ __html: title }} />
				<p>Posted on {date}</p>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</article>
		</>
	);
};

export const pageQuery = graphql`
	query WordpressPostBySlug($slug: String!) {
		wordpressPost(slug: { eq: $slug }) {
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

export default injectSheet(styles)(Post);
