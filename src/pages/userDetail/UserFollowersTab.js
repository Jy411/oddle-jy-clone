import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, Grid } from '@mui/material';

import TabPanel from 'components/elements/TabPanel';
import UserCardGrid from 'components/layout/UserCardGrid';
import UserCard from 'components/UserCard';

const UserFollowersTab = ({ followersUrl, value }) => {
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
		<TabPanel index={1} value={value}>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color='success' />
				</Box>
			) : (
				<UserCardGrid>
					{userFollowers.map((user) => (
						<Grid item key={user.id} sm={6} xs={12}>
							<UserCard user={user} />
						</Grid>
					))}
				</UserCardGrid>
			)}
		</TabPanel>
	);
};

export default UserFollowersTab;
