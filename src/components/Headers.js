import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField } from '@mui/material';
import Header from './elements/Header';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

const HeaderWrapper = ({ children }) => {
	return (
		<Box
			square
			component={Paper}
			elevation={2}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: 2,
			}}
		>
			{children}
		</Box>
	);
};

const UserDetailHeader = () => {
	let navigate = useNavigate();

	return (
		<HeaderWrapper>
			<Header
				icon={<HomeIcon onClick={() => navigate('/search')} fontSize='large' />}
			/>
		</HeaderWrapper>
	);
};

const Searchbar = ({ onChange }) => {
	return (
		<TextField
			fullWidth
			label='Enter GitHub username, i.e. gaearon'
			placeholder='Enter GitHub username, i.e. gaearon'
			id='searchbar'
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
