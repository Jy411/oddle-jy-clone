import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Paper, Typography, Grid } from '@mui/material';

import { FavouritesHeader } from 'components/Headers';
import CenterBox from 'components/layout/CenterBox';
import UserCardGrid from 'components/layout/UserCardGrid';
import UserCard from 'components/UserCard';

import RemoveFromFavSnackbar from '../components/RemoveFromFavSnackbar';

const FavouritesPage = () => {
	const { userFavourites } = useSelector((state) => state.userFavourites);
	const [removeFromFavSnackbar, setRemoveFromFavSnackbar] = useState(false);

	return (
		<>
			<FavouritesHeader />

			{userFavourites.length === 0 && (
				<CenterBox>
					<PeopleOutlineIcon sx={{ fontSize: 36 }} />
					<Typography
						sx={{
							textAlign: 'center',
							maxWidth: 285,
						}}
						variant='subtitle2'
					>
						Once you like people, you'll see them here.
					</Typography>
				</CenterBox>
			)}

			{userFavourites.length > 0 && (
				<Paper
					elevation={0}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						px: 3,
						py: 2,
						height: '100vh',
					}}
				>
					<UserCardGrid>
						{userFavourites.map((user) => {
							return (
								<Grid item key={user.id} sm={6} xs={12}>
									<UserCard
										showRemoveSnackbar={() => setRemoveFromFavSnackbar(true)}
										user={user}
									/>
								</Grid>
							);
						})}
					</UserCardGrid>
				</Paper>
			)}

			<RemoveFromFavSnackbar
				removeFromFavSnackbar={removeFromFavSnackbar}
				setRemoveFromFavSnackbar={setRemoveFromFavSnackbar}
			/>
		</>
	);
};

export default FavouritesPage;
