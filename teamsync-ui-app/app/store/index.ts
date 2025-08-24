import { configureStore } from "@reduxjs/toolkit";
import taskFormReducer from "./taskFormSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    taskForm: taskFormReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
