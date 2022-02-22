import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import TabPanel from '../../components/elements/TabPanel';
import UserCard from '../../components/UserCard';
import UserCardGrid from '../../components/layout/UserCardGrid';
import { Box, CircularProgress } from '@mui/material';

const UserFollowersTab = ({ value, followersUrl }) => {
	const [loading, setLoading] = useState(false);
	const [userFollowers, setUserFollowers] = useState([]);

	useEffect(() => {
		setLoading(true);
		const fetchUserFollowers = async () => {
			await fetch(followersUrl)
				.then((res) => res.json())
				.then((data) => {
					setUserFollowers(data);
					setLoading(false);
				});
		};
		fetchUserFollowers();
	}, [followersUrl]);

	return (
		<TabPanel value={value} index={1}>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color='success' />
				</Box>
			) : (
				<UserCardGrid>
					{userFollowers.map((user) => (
						<Grid item xs={12} sm={6} key={user.id}>
							<UserCard user={user} />
						</Grid>
					))}
				</UserCardGrid>
			)}
		</TabPanel>
	);
};

export default UserFollowersTab;
