import React from 'react';

import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import { Box, Paper, TextField } from '@mui/material';

import Header from './elements/Header';

const HeaderWrapper = ({ children }) => {
	return (
		<Box
			square
			component={Paper}
			elevation={20}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				px: 2,
				pb: 1,
			}}
		>
			{children}
		</Box>
	);
};

const UserDetailHeader = () => {
	const navigate = useNavigate();

	return (
		<HeaderWrapper>
			<Header
				icon={<HomeIcon fontSize='large' onClick={() => navigate('/search')} />}
			/>
		</HeaderWrapper>
	);
};

const Searchbar = ({ onChange }) => {
	return (
		<TextField
			fullWidth
			id='searchbar'
			label='Enter GitHub username, i.e. gaearon'
			placeholder='Enter GitHub username, i.e. gaearon'
			onChange={onChange}
		/>
	);
};

const SearchHeader = ({ onChange }) => {
	return (
		<HeaderWrapper>
			<Header headerLabel='Search' />
			<Searchbar onChange={onChange} />
		</HeaderWrapper>
	);
};

const FavouritesHeader = () => {
	return (
		<HeaderWrapper>
			<Header headerLabel='Favourites' />
		</HeaderWrapper>
	);
};

export { SearchHeader, UserDetailHeader, FavouritesHeader };
