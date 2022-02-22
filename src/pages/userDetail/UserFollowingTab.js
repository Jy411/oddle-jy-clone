import React, { useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

import TabPanel from 'components/elements/TabPanel';
import UserCardGrid from 'components/layout/UserCardGrid';
import UserCard from 'components/UserCard';

const UserFollowingTab = ({ followingUrl, value }) => {
	const [loading, setLoading] = useState(false);
	const [userFollowing, setUserFollowing] = useState([]);

	useEffect(() => {
		setLoading(true);
		const fetchUsersFollowing = async () => {
			await fetch(followingUrl.replace('{/other_user}', ''))
				.then((res) => res.json())
				.then((data) => {
					setUserFollowing(data);
					setLoading(false);
				});
		};
		fetchUsersFollowing();
	}, [followingUrl]);

	return (
		<TabPanel index={2} value={value}>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color='success' />
				</Box>
			) : (
				<UserCardGrid>
					{userFollowing.map((user) => (
						<Grid item key={user.id} sm={6} xs={12}>
							<UserCard user={user} />
						</Grid>
					))}
				</UserCardGrid>
			)}
		</TabPanel>
	);
};

export default UserFollowingTab;
