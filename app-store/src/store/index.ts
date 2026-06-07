import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice";
import { useDispatch } from "react-redux";
import cartReducer from "./slices/cart-slice";
import courseReducer from "./slices/course-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
