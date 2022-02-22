import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import userFavouritesReducer from './userFavourites';

export default configureStore({
	reducer: {
		auth: authReducer,
		userFavourites: userFavouritesReducer,
	},
});
