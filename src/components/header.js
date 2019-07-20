import { Link } from "gatsby";
import React from "react";

const Header = ({ siteTitle, handleToggleNav }) => (
	<header>
		<div
			style={{
				margin: `0 auto`,
				padding: `1.45rem 1.0875rem`,
				display: "flex"
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link to="/">{siteTitle}</Link>
			</h1>
			<button style={{ marginLeft: "auto" }} onClick={handleToggleNav}>
				Toggle nav
			</button>
		</div>
	</header>
);

Header.defaultProps = {
	siteTitle: ``
};

export default Header;
