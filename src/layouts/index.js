/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState, useCallback } from "react";
import { StaticQuery, graphql } from "gatsby";

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
	return (
		<StaticQuery
			query={graphql`
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
			`}
			render={data => {
				const isHome = pageContext.layout === "home";
				return (
					<>
						<div
							id="container"
							className={classes.layoutRoot}
							style={isNavOpen ? { transform: "translateX(-30vw)" } : {}}
						>
							<LayoutNav
								isOpen={isNavOpen}
								setIsOpen={setIsNavOpen}
								committees={data.allWordpressWpCommittee.edges.map(
									edge => edge.node
								)}
							/>
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
									<footer>
										<div className="footer" style={{ padding: "1em 2em" }}>
											<nav className="pull-left">
												<a itemProp="url" href="/">
													<Image
														style={{ width: 114, height: 100 }}
														imgName="dsa-new-orleans-logo-footer.png"
														alt="DSA New Orleans"
														title="DSA New Orleans"
													/>
												</a>
												<span
													className="microdata-logo"
													itemProp="logo"
													style={{ display: "none" }}
												>
													<Image imgName="equal-access-legal-logo.png" />
												</span>
											</nav>
											<div className="copyright">
												<p>
													© {new Date().getFullYear()}{" "}
													<span itemProp="name">DSA New Orleans</span>
													<br className="visible-xs" />
													<span style={{ fontSize: "10px", color: "#7b7b7b" }}>
														All rights reserved.
													</span>
												</p>
											</div>
											<div className="additional-links">
												Get in Touch!
												<br />{" "}
												<a href="hello@dsaneworleans.org">
													hello@dsaneworleans.org
												</a>
											</div>
										</div>
										<br className="clearit" />
									</footer>
								</div>
							</div>
						</div>
					</>
				);
			}}
		/>
	);
};

const styles = {
	layoutRoot: {
		transition: ".2s"
	},
	layoutInner: {
		transition: ".2s"
	}
};

export default useSheet(styles)(Layout);
