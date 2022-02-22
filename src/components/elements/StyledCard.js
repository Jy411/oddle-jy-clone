import React from 'react';

import Card from '@mui/material/Card';

const StyledCard = ({ children, ...props }) => {
	return (
		<Card
			raised
			elevation={2}
			sx={{
				display: 'flex',
				alignItems: 'center',
				p: 1,
				height: 70,
				borderRadius: 3,
			}}
			{...props}
		>
			{children}
		</Card>
	);
};

export default StyledCard;
