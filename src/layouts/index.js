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
						? { pointerEvents: "none", transform: "translateX(-30vw)" }
						: {}
				}
			>
				<div
					className={classes.layoutInner}
					style={isNavOpen ? { opacity: 0.6 } : {}}
				>
					<Header
						isNavOpen={isNavOpen}
						handleToggleNav={handleToggleNav}
						siteTitle={data.site.siteMetadata.title}
					/>
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
						<footer className={classes.footer}>
							<a itemProp="url" href="/">
								<Image
									style={{ width: 114, height: 100 }}
									imgName="dsa-new-orleans-logo-footer.png"
									alt="DSA New Orleans"
									title="DSA New Orleans"
								/>
							</a>
							<div>
								<p>
									© {new Date().getFullYear()}{" "}
									<span itemProp="name">DSA New Orleans</span>
									<br className="visible-xs" />
									<span style={{ fontSize: "10px", color: "#7b7b7b" }}>
										All rights reserved.
									</span>
								</p>
							</div>
							<div>
								Get in Touch!
								<br />
								<a href="hello@dsaneworleans.org">hello@dsaneworleans.org</a>
							</div>
						</footer>
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
			paddingTop: [u * 8]
		},
		layoutInner: {
			transition: ".2s"
		},
		footer: {
			display: "flex",
			justifyContent: "space-between",
			padding: [u * 2, u * 4],
			background: theme.palette.black,
			color: "#fff"
		}
	};
};

export default useSheet(styles)(Layout);
