import React, { useEffect, useState } from 'react';

import { createTokenAuth } from '@octokit/auth-token';
import { useDispatch } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import {
	BottomNavigation,
	BottomNavigationAction,
	Container,
	Paper,
} from '@mui/material';

import { setAuth } from 'redux/auth';

const TabNavigation = () => {
	const [value, setValue] = useState(0);
	return (
		<Paper
			elevation={24}
			sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
		>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction
					component={Link}
					icon={<SearchIcon />}
					label='Search'
					to='/'
				/>
				<BottomNavigationAction
					component={Link}
					icon={<FavoriteIcon />}
					label='Favourites'
					to='/favourites'
				/>
			</BottomNavigation>
		</Paper>
	);
};

const App = () => {
	const [token, setToken] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchAuth = async () => {
			const auth = createTokenAuth(process.env.REACT_APP_GITHUB_ACCESS_TOKEN);
			return auth();
		};
		// eslint-disable-next-line no-shadow
		fetchAuth().then((token) => {
			setToken(token);
			localStorage.setItem('token', token.token);
		});
	}, []);

	useEffect(() => {
		if (token) {
			dispatch(setAuth(token));
		}
	}, [dispatch, token]);

	return (
		<Container
			disableGutters
			square
			component={Paper}
			elevation={1}
			maxWidth='md'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: 'calc(100vh - 56px)', // 56px = bottom nav height
				// p: 0,
			}}
		>
			<TabNavigation />
			<Outlet />
		</Container>
	);
};

export default App;
