import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	CircularProgress,
	Paper,
	Grid,
	Typography,
	useTheme,
} from '@mui/material';

import { SearchHeader } from 'components/Headers';
import CenterBox from 'components/layout/CenterBox';
import UserCardGrid from 'components/layout/UserCardGrid';
import SearchPagePagination from 'components/SearchPagePagination';
import UserCard from 'components/UserCard';

import request from 'api/request';

import GitHubLogoText from 'images/GitHubLogoText.png';
import GitHubLogoTextWhite from 'images/GitHubLogoTextWhite.png';
import GitHubLogo from 'images/GitHubMark120.png';
import GitHubLightLogo from 'images/GitHubMarkLight120.png';

const SearchPageIntro = () => {
	const theme = useTheme();

	const { mode } = theme.palette;

	return (
		<CenterBox>
			<Box
				alt='github logo'
				component='img'
				src={mode === 'dark' ? GitHubLightLogo : GitHubLogo}
				sx={{
					width: 120,
				}}
			/>
			<Box
				alt='github text'
				component='img'
				src={mode === 'dark' ? GitHubLogoTextWhite : GitHubLogoText}
				sx={{
					width: 139,
				}}
			/>
			<Typography
				sx={{
					textAlign: 'center',
					maxWidth: 285,
				}}
				variant='subtitle2'
			>
				Enter GitHub username and search users matching the input like Google
				Search, click avatars to view more details, including repositories,
				followers and following.
			</Typography>
		</CenterBox>
	);
};

const SearchPage = () => {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [queryResponse, setQueryResponse] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSearchChange = (e) => {
		setSearchQuery(e.target.value);
		setPage(1);
	};

	const onPageChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		if (searchQuery) {
			const fetchUsers = () => {
				setLoading(true);

				const fetchingData = async () => {
					return request('GET /search/users', {
						q: searchQuery,
						page,
					})
						.then((res) => {
							setQueryResponse(res);
							setLoading(false);
						})
						.catch((err) => {
							// TODO Error Handling
							console.log(err);
							setLoading(false);
						});
				};

				fetchingData();
			};

			const debouncedFetchUsers = _.debounce(() => fetchUsers(), 1000);

			debouncedFetchUsers();
		} else {
			setQueryResponse(null);
			setLoading(false);
		}
	}, [searchQuery, page]);

	const { items, total_count } = queryResponse?.data || {};

	return (
		<>
			<SearchHeader onChange={onSearchChange} />

			{loading && (
				<CenterBox>
					<CircularProgress color='success' />
				</CenterBox>
			)}

			{!queryResponse && !loading && <SearchPageIntro />}

			{queryResponse && total_count !== 0 && !loading && (
				<Paper
					elevation={0}
					sx={{ display: 'flex', flexDirection: 'column', px: 3, py: 1 }}
				>
					<Typography sx={{ my: 0 }} variant='subtitle1'>
						{total_count} GitHub Users found
					</Typography>
					<UserCardGrid>
						{items.map((user) => (
							<Grid item key={user.id} sm={6} xs={12}>
								<UserCard user={user} />
							</Grid>
						))}
					</UserCardGrid>
					<SearchPagePagination
						currentPage={page}
						totalPages={total_count / 12}
						onChange={onPageChange}
					/>
				</Paper>
			)}

			{total_count === 0 && !loading && (
				<CenterBox opacity={1}>
					<SearchIcon />
					<Typography variant='body1'>
						No search result found for <b>{searchQuery}</b>
					</Typography>
				</CenterBox>
			)}
		</>
	);
};
export default SearchPage;
