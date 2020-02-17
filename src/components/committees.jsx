import React from 'react';
import SEO from './seo';
import { graphql, Link } from 'gatsby';
import injectSheet from 'react-jss';

const Committees = ({ data, classes }) => (
	<>
		<SEO title="Committees" />
		<div className={classes.root}>
			{data.allWordpressWpCommittee.edges.map(({ node: { title, slug } }) => (
				<div key={slug}>
					<Link to={`/committees/${slug}`}>{title}</Link>
				</div>
			))}
		</div>
	</>
);

export const pageQuery = graphql`
	{
		allWordpressWpCommittee {
			edges {
				node {
					title
					slug
				}
			}
		}
	}
`;

const styles = (theme) => {
	const u = theme.spacing.unit;
	return {
		root: {
			padding: [u * 2, u * 4],
		},
	};
};

export default injectSheet(styles)(Committees);
