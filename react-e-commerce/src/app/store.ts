import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function userReducer(_state: unknown, _action: unknown): unknown {
  // Keep the current state for any unhandled actions to avoid unused parameter errors.
  void _action;
  return _state;
}
