/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../components/header";
import Image from "../components/image";
import "./layout.css";
import "../sass/style.scss";
import "../sass/wp-block-library.scss";
import LayoutNav from "./nav";
import useSheet from "react-jss";
import LayoutFooter from "./footer";

const Layout = ({ pageContext, children, classes }) => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const handleToggleNav = useCallback(() => {
		setIsNavOpen(currentIsNavOpen => !currentIsNavOpen);
	}, []);
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}

			allWordpressWpCommittee {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`);

	const isHome = pageContext.layout === "home";

	return (
		<>
			<Header
				isNavOpen={isNavOpen}
				handleToggleNav={handleToggleNav}
				siteTitle={data.site.siteMetadata.title}
			/>
			<LayoutNav
				isOpen={isNavOpen}
				setIsOpen={setIsNavOpen}
				committees={data.allWordpressWpCommittee.edges.map(edge => edge.node)}
			/>
			<div
				id="container"
				className={classes.layoutRoot}
				style={
					isNavOpen
						? {
								opacity: 0.6,
								pointerEvents: "none",
								transform: "translateX(-1vw)"
						  }
						: {}
				}
			>
				<div className={classes.layoutInner}>
					{isHome ? (
						<div className="hero-index">
							<div className="wrap hero-wrap">
								<Image
									imgName="dsanola_FBpage_banner-01.png"
									className="hero-index-img"
									alt={`A stylized map of the New Orleans riverfront captioned with "A better world is possible"`}
									title={`A stylized map of the New Orleans riverfront captioned with " A better world is possible"`}
								/>
							</div>
						</div>
					) : null}

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							minHeight: "100vh"
						}}
					>
						<main
							style={{ flexGrow: 1, flexShrink: 0 }}
							id="content"
							className="wrap"
						>
							{children}
						</main>
						<LayoutFooter />
					</div>
				</div>
			</div>
		</>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		layoutRoot: {
			transition: ".2s",
			marginTop: [u * 8],
			background: "#fff"
		},
		layoutInner: {
			transition: ".2s"
		}
	};
};

export default useSheet(styles)(Layout);
