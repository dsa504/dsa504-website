import React from "react";
import { Link } from "gatsby";

const HomeCommittees = ({ committees, onClickLink }) => {
	return (
		<>
			{committees.map(({ title, slug }) => (
				<div key={slug}>
					<Link onClick={onClickLink} to={`/committees/${slug}`}>
						{title}
					</Link>
				</div>
			))}
		</>
	);
};

export default HomeCommittees;
