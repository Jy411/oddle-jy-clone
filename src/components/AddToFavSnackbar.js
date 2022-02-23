import React from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddToFavSnackbar = ({ addToFavSnackbar, setAddToFavSnackbar }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			autoHideDuration={1000}
			open={addToFavSnackbar}
			sx={{ pb: 5 }}
			onClose={() => setAddToFavSnackbar(false)}
		>
			<MuiAlert
				severity='success'
				variant='filled'
				onClose={() => setAddToFavSnackbar(false)}
			>
				User added to favourites!
			</MuiAlert>
		</Snackbar>
	);
};

export default AddToFavSnackbar;
