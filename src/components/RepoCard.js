import React from 'react';

import { Box, Typography } from '@mui/material';

import StyledCard from './elements/StyledCard';

const RepoCard = ({ repoDetails }) => {
	const { forks_count, name, stargazers_count } = repoDetails;

	return (
		<StyledCard
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				p: 1,
				px: 2,
				height: 70,
				borderRadius: 3,
			}}
		>
			<Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
				{name}
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography variant='caption'>{stargazers_count} stars</Typography>
				<Typography variant='caption'>{forks_count} forks</Typography>
			</Box>
		</StyledCard>
	);
};

export default RepoCard;
