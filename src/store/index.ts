import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import commentReducer from "./commentSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
