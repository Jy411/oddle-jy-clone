import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import {
	Avatar,
	Box,
	Container,
	Paper,
	Typography,
	Tab,
	Tabs,
} from '@mui/material';

import { UserDetailHeader } from 'components/Headers';

import UserFollowersTab from './UserFollowersTab';
import UserFollowingTab from './UserFollowingTab';
import UserRepoTab from './UserRepoTab';

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
			<Typography sx={{ fontWeight: 'bold' }} variant='h4'>
				{user.name}
			</Typography>
			<Typography sx={{ fontWeight: 'light' }} variant='h5'>
				{user.login}
			</Typography>
			<Box
				sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
			>
				<LocationCityIcon sx={{ opacity: 0.5 }} />
				{user.location ? (
					<Typography sx={{ fontWeight: 'light' }} variant='subtitle1'>
						{user.location}
					</Typography>
				) : (
					<Typography sx={{ fontWeight: 'light' }} variant='subtitle1'>
						No Location
					</Typography>
				)}
			</Box>
		</Box>
	);
};

const UserDetailTabBar = ({ ...user }) => {
	const [value, setValue] = useState(0);

	const TabOptions = () => (
		<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
			<Tabs
				aria-label='basic tabs example'
				value={value}
				variant='fullWidth'
				onChange={handleChange}
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
				<UserRepoTab reposUrl={user.repos_url} value={value} />

				<UserFollowersTab followersUrl={user.followers_url} value={value} />

				<UserFollowingTab followingUrl={user.following_url} value={value} />
			</Paper>
		</Box>
	);
};

const UserDetailPage = () => {
	const { state } = useLocation();

	return (
		<Container
			disableGutters
			square
			component={Paper}
			elevation={0}
			maxWidth='md'
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
