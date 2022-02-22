import React, { useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

import TabPanel from 'components/elements/TabPanel';
import UserCardGrid from 'components/layout/UserCardGrid';
import RepoCard from 'components/RepoCard';

const UserRepoTab = ({ reposUrl, value }) => {
	const [loading, setLoading] = useState(false);
	const [userRepos, setUserRepos] = useState([]);

	useEffect(() => {
		setLoading(true);
		const fetchPublicRepos = async () => {
			await fetch(reposUrl)
				.then((res) => res.json())
				.then((data) => {
					setUserRepos(data);
					setLoading(false);
				});
		};
		fetchPublicRepos();
	}, [reposUrl]);

	return (
		<TabPanel index={0} value={value}>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color='success' />
				</Box>
			) : (
				<UserCardGrid>
					{userRepos.map((repo) => (
						<Grid item key={repo.id} sm={6} xs={12}>
							<RepoCard repoDetails={repo} />
						</Grid>
					))}
				</UserCardGrid>
			)}
		</TabPanel>
	);
};
export default UserRepoTab;
