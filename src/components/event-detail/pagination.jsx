import React from "react";
import injectSheet from "react-jss";
import { Link } from "gatsby";

const EventDetailPagination = ({
	previous,
	next,
	prevSlug,
	nextSlug,
	classes
}) => {
	return (
		<div className={classes.container}>
			{prevSlug ? (
				<Link className={classes.prevLink} to={prevSlug}>
					<div className={classes.linkContents}>
						<span className={classes.arrow}>&#8592;</span>{" "}
						<span className={classes.linkText}>{previous.summary}</span>
					</div>
				</Link>
			) : null}
			{nextSlug ? (
				<Link className={classes.nextLink} to={nextSlug}>
					<div className={classes.linkContents}>
						<span className={classes.linkText}>{next.summary}</span>{" "}
						<span className={classes.arrow}>&#8594;</span>
					</div>
				</Link>
			) : null}
		</div>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		container: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
		},
		link: {
			display: "flex",
			alignSelf: "stretch",
			flex: "0 1 auto",
			padding: [u * 1.5, u * 3],
			borderWidth: 1,
			borderStyle: "solid",
			borderRadius: u * 4
		},
		linkContents: {
			display: "flex",
			maxWidth: "40vw",
			alignItems: "center"
		},
		prevLink: { composes: "$link", paddingLeft: u },
		nextLink: { composes: "$link", paddingRight: u * 1.5 },
		linkText: {
			color: theme.palette.red
		},
		arrow: {
			color: theme.palette.black,
			margin: [0, u * 2]
		}
	};
};

export default injectSheet(styles)(EventDetailPagination);
