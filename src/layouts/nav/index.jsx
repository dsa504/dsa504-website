import React, { useCallback, useRef } from 'react';
import HomeCommittees from '../../components/home-committees';
import injectSheet from 'react-jss';
import useOnClickOutside from 'use-onclickoutside';
import NavSectionHeader from './section-header';
import HomeCalendar from '../../components/home-calendar';

const LayoutNav = ({ committees, events, setIsOpen, classes }) => {
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const handleNavClick = useCallback(
		(e) => {
			const isLinkOrHasLink = e.target && (e.target.nodeName === 'A' || e.target.closest('a'));

			if (isLinkOrHasLink) {
				handleClose();
			}
		},
		[handleClose]
	);

	const ref = useRef(null);
	useOnClickOutside(ref, handleClose);
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div ref={ref} className={classes.root} onClick={handleNavClick}>
			<NavSectionHeader linkTo="/committees">Committees &amp; Caucuses</NavSectionHeader>
			<HomeCommittees committees={committees} />
			<br />
			<NavSectionHeader linkTo="/events">Upcoming Events</NavSectionHeader>
			<HomeCalendar events={events} />
		</div>
	);
};

const styles = (theme) => {
	const u = theme.spacing.unit;

	return {
		root: {
			zIndex: theme.zIndex.navbar + 1,
			transition: '.2s',
			transform: (props) => (props.isOpen ? 'translateX(0)' : 'translateX(30vw)'),
			boxShadow: (props) =>
				props.isOpen ? '-12px 0 24px 0 rgba(0,0,0,0.25)' : '36px 0 24px 0 rgba(0,0,0,0)',
			width: '30vw',
			background: theme.palette.red,
			'&, & a': {
				color: '#fff',
			},
			position: 'fixed',
			top: 0,
			right: 0,
			height: '100vh',
			overflowY: 'auto',
			padding: [u * 2, u * 4],
		},
	};
};

export default injectSheet(styles)(LayoutNav);
