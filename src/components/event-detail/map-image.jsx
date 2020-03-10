import React from 'react';
import injectSheet from 'react-jss';

const EventDetailMapImage = ({ mapImage, classes }) => {
	return mapImage ? (
		<div
			className={classes.root}
			style={{
				backgroundImage: mapImage ? `url(${mapImage.childImageSharp.fluid.base64})` : null,
			}}
		>
			<img style={{ maxWidth: '100%' }} src={mapImage.publicURL} />
		</div>
	) : (
		<div className={classes.empty}>Location TBD</div>
	);
};

const styles = (theme) => {
	const u = theme.spacing.unit;
	return {
		root: {
			maxWidth: u * 50,
			height: u * 50,
			flex: '1 0 auto',
			marginRight: u * 4,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
		},
		empty: {
			composes: '$root',
			backgroundColor: '#bbb',
			color: '#fff',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	};
};

export default injectSheet(styles)(EventDetailMapImage);
