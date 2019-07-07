import React from "react";
import { Link } from "gatsby";

const HomeCommittees = ({ committees, onClickLink }) => {
	return (
		<>
			<Link to="/committees" onClick={onClickLink}>
				<h3>Committees &amp; Caucuses</h3>
			</Link>
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
