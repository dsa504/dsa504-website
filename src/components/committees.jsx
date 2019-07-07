import React from "react";
import SEO from "./seo";
import { graphql, Link } from "gatsby";

const Committee = ({ data }) => (
	<>
		<SEO title="Committees" />
		{data.allWordpressWpCommittee.edges.map(({ node: { title, slug } }) => (
			<div key={slug}>
				<Link to={`/committees/${slug}`}>{title}</Link>
			</div>
		))}
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

export default Committee;
