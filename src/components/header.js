import { Link } from "gatsby";
import React from "react";

const Header = ({ siteTitle, handleToggleNav }) => (
	<header
		style={{
			background: `#ec1f27`,
			marginBottom: `1.45rem`
		}}
	>
		<div
			style={{
				margin: `0 auto`,
				maxWidth: 960,
				padding: `1.45rem 1.0875rem`,
				display: "flex"
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link
					to="/"
					style={{
						color: `white`,
						textDecoration: `none`
					}}
				>
					{siteTitle}
				</Link>
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
