import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Typography, CardMedia, Skeleton, Avatar } from '@mui/material';
import { pink } from '@mui/material/colors';

import {
	addUserToFavourites,
	removeUserFromFavourites,
} from 'redux/userFavourites';

import request from 'api/request';

import StyledCard from './elements/StyledCard';

const UserCard = ({ user }) => {
	const [followingCount, setFollowingCount] = useState(0);
	const [followersCount, setFollowersCount] = useState(0);
	const [userDetail, setUserDetail] = useState({});
	const [loading, setLoading] = useState(false);
	const { userFavourites } = useSelector((state) => state.userFavourites);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		const getUserDetails = async (username) => {
			await request('GET /users/{username}', {
				username,
			}).then((res) => {
				if (isMounted) {
					setUserDetail(res.data);
					setFollowingCount(res.data.following);
					setFollowersCount(res.data.followers);
					setLoading(false);
				}
			});
		};
		getUserDetails(user.login);
		return () => {
			isMounted = false;
		};
	}, [user]);

	const addToFavourites = () => {
		dispatch(addUserToFavourites(user));
	};

	const removeFromFavourites = () => {
		dispatch(removeUserFromFavourites(user));
	};

	return (
		<StyledCard>
			{loading ? (
				<Skeleton height={64} variant='circular' width={64}>
					<Avatar />
				</Skeleton>
			) : (
				<CardMedia>
					<Avatar
						src={user.avatar_url}
						sx={{ width: 64, height: 64 }}
						onClick={() => navigate('/detail', { state: { userDetail } })}
					/>
				</CardMedia>
			)}
			<Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: 2 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography noWrap>
						<b>{loading ? <Skeleton width={30} /> : user.login}</b>
					</Typography>
					{userFavourites.includes(user) ? (
						<FavoriteIcon
							sx={{ color: pink[500] }}
							onClick={removeFromFavourites}
						/>
					) : (
						<FavoriteBorderIcon
							sx={{ color: pink[500] }}
							onClick={addToFavourites}
						/>
					)}
				</Box>
				<Box>
					<Typography noWrap component='p' variant='caption'>
						{loading ? <Skeleton /> : `${followingCount} Following`}
					</Typography>
					<Typography noWrap component='p' variant='caption'>
						{loading ? <Skeleton /> : `${followersCount} Following`}
					</Typography>
				</Box>
			</Box>
		</StyledCard>
	);
};

export default UserCard;
