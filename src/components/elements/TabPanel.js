import React from 'react';

const TabPanel = (props) => {
	const { children, index, value, ...other } = props;

	return (
		<div
			aria-labelledby={`simple-tab-${index}`}
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			role='tabpanel'
			{...other}
		>
			{value === index && children}
		</div>
	);
};

export default TabPanel;
