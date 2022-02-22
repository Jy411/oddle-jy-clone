import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Typography, CardMedia, LinearProgress } from '@mui/material';
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
				<Box sx={{ width: '100%' }}>
					<LinearProgress
						color='secondary'
						sx={{ height: 15, borderRadius: 5 }}
					/>
				</Box>
			) : (
				<>
					<CardMedia
						component='img'
						src={user.avatar_url}
						sx={{ width: 64, height: 64 }}
						onClick={() => navigate('/detail', { state: { userDetail } })}
					/>
					<Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: 2 }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography noWrap component='p' variant='subtitle1'>
								<b>{user.login}</b>
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
								{followingCount} Following
							</Typography>
							<Typography noWrap component='p' variant='caption'>
								{followersCount} followers
							</Typography>
						</Box>
					</Box>
				</>
			)}
		</StyledCard>
	);
};

export default UserCard;
