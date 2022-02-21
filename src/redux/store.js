import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userFavouritesReducer from "./userFavourites";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userFavourites: userFavouritesReducer,
  },
});
