import React from "react";
import useSheet from "react-jss";
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
				<div>
					<Link className={classes.link} to={prevSlug}>
						<span className={classes.arrow}>&#8592;</span>{" "}
						<span className={classes.linkText}>{previous.summary}</span>
					</Link>
				</div>
			) : null}
			{nextSlug ? (
				<div>
					<Link className={classes.link} to={nextSlug}>
						<span className={classes.linkText}>{next.summary}</span>{" "}
						<span className={classes.arrow}>&#8594;</span>
					</Link>
				</div>
			) : null}
		</div>
	);
};

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		container: { display: "flex", justifyContent: "space-between" },
		link: {
			padding: [u * 1.5, u * 3],
			borderWidth: 1,
			borderStyle: "solid",
			borderRadius: u * 4
		},
		linkText: {
			color: theme.palette.red
		},
		arrow: {
			color: theme.palette.black
		}
	};
};

export default useSheet(styles)(EventDetailPagination);
