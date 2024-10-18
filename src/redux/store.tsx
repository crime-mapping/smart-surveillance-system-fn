import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice/authSlice";
import { apiSlice } from "./slices/apiSlice";
import userSlice from "./slices/usersSlice/userSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
