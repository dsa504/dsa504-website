import React from "react";
import useSheet from "react-jss";
import Image from "../../components/image";

const LayoutFooter = ({ classes }) => {
	return (
		<footer className={classes.root}>
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
	);
};

const styles = theme => {
	const u = theme.spacing.unit;
	return {
		root: {
			display: "flex",
			justifyContent: "space-between",
			padding: [u * 2, u * 4],
			background: theme.palette.black,
			color: "#fff"
		}
	};
};

export default useSheet(styles)(LayoutFooter);
