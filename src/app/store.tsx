import { configureStore } from "@reduxjs/toolkit";
import { columnSlice, ColumnState } from "../features/slice";

interface RootState {
  column: ColumnState;
}

export const store = configureStore({
  reducer: {
    column: columnSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
