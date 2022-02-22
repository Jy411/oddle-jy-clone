import React, { useState } from 'react';

import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import { useLocation } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import UserRepoTab from './UserRepoTab';
import UserFollowersTab from './UserFollowersTab';
import UserFollowingTab from './UserFollowingTab';
import { UserDetailHeader } from '../../components/Headers';

const UserAvatarDetail = ({ ...user }) => {
	return (
		<Box
			component={Paper}
			elevation={0}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				borderRadius: 0,
				pt: 2,
				gap: 0.5,
			}}
		>
			<Avatar
				alt='user avatar'
				src={user.avatar_url}
				sx={{ height: 160, width: 160 }}
			/>
			<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
				{user.name}
			</Typography>
			<Typography variant='h5' sx={{ fontWeight: 'light' }}>
				{user.login}
			</Typography>
			<Box
				sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
			>
				<LocationCityIcon sx={{ opacity: 0.5 }} />
				{user.location ? (
					<Typography variant='subtitle1' sx={{ fontWeight: 'light' }}>
						{user.location}
					</Typography>
				) : (
					<Typography variant='subtitle1' sx={{ fontWeight: 'light' }}>
						No Location
					</Typography>
				)}
			</Box>
		</Box>
	);
};

const UserDetailTabBar = ({ ...user }) => {
	const [value, setValue] = useState(0);

	console.log('user', user);

	const TabOptions = () => (
		<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
			<Tabs
				variant='fullWidth'
				value={value}
				onChange={handleChange}
				aria-label='basic tabs example'
			>
				<Tab wrapped label={`Repositories (${user.public_repos})`} />
				<Tab wrapped label={`Followers (${user.followers})`} />
				<Tab wrapped label={`Following (${user.following})`} />
			</Tabs>
		</Box>
	);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<TabOptions />

			<Paper
				elevation={0}
				sx={{ display: 'flex', flexDirection: 'column', p: 3 }}
			>
				<UserRepoTab value={value} reposUrl={user.repos_url} />

				<UserFollowersTab value={value} followersUrl={user.followers_url} />

				<UserFollowingTab value={value} followingUrl={user.following_url} />
			</Paper>
		</Box>
	);
};

const UserDetailPage = () => {
	const { state } = useLocation();

	return (
		<Container
			component={Paper}
			elevation={0}
			maxWidth='md'
			square
			disableGutters
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
			}}
		>
			<UserDetailHeader />

			<UserAvatarDetail {...state.userDetail} />
			<UserDetailTabBar {...state.userDetail} />
		</Container>
	);
};

export default UserDetailPage;
