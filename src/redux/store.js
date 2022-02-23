import { combineReducers, createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './auth';
import userFavouritesReducer from './userFavourites';

// redux-persist setup
const persistConfig = {
	key: 'root',
	storage,
};

const reducers = combineReducers({
	auth: authReducer,
	userFavourites: userFavouritesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
	const store = createStore(persistedReducer);
	const persistor = persistStore(store);
	return { store, persistor };
};
