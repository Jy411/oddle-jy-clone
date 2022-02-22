import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	auth: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.auth = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
