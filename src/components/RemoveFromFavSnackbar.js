import React from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const RemoveFromFavSnackbar = ({
	removeFromFavSnackbar,
	setRemoveFromFavSnackbar,
}) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			autoHideDuration={1000}
			open={removeFromFavSnackbar}
			sx={{ pb: 5 }}
			onClose={() => setRemoveFromFavSnackbar(false)}
		>
			<MuiAlert
				severity='error'
				variant='filled'
				onClose={() => setRemoveFromFavSnackbar(false)}
			>
				User removed from favourites!
			</MuiAlert>
		</Snackbar>
	);
};

export default RemoveFromFavSnackbar;
