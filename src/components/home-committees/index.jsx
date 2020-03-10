import React from 'react';
import { Link } from 'gatsby';

const HomeCommittees = ({ committees }) => {
	return (
		<>
			{committees.map(({ title, slug }) => (
				<div key={slug}>
					<Link to={`/committees/${slug}`}>{title}</Link>
				</div>
			))}
		</>
	);
};

export default HomeCommittees;
