import { configureStore } from "@reduxjs/toolkit";
import taskFormReducer from "./taskFormSlice";

export const store = configureStore({
  reducer: {
    taskForm: taskFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
