import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userFavourites: [],
};

export const userFavouritesSlice = createSlice({
  name: "userFavourites",
  initialState,
  reducers: {
    addUserToFavourites: (state, action) => {
      state.userFavourites.push(action.payload);
    },
    removeUserFromFavourites: (state, action) => {
      // remove user from favourites
      state.userFavourites = state.userFavourites.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserToFavourites, removeUserFromFavourites } =
  userFavouritesSlice.actions;

export default userFavouritesSlice.reducer;
