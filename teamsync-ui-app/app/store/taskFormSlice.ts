import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskData = {
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskStartDate: string;
  taskDueDate: string;
  taskAssignedUsers: string[];
  taskFiles: { name: string; uri: string }[];
};

const initialState: TaskData = {
  taskName: "",
  taskDescription: "",
  taskPriority: "",
  taskStartDate: "",
  taskDueDate: "",
  taskAssignedUsers: [],
  taskFiles: [],
};

const taskFormSlice = createSlice({
  name: "taskForm",
  initialState,
  reducers: {
    updateTaskFormData: (
      state,
      action: PayloadAction<{ key: keyof TaskData; value: any }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetTaskForm: () => initialState,
  },
});

export const { updateTaskFormData, resetTaskForm } = taskFormSlice.actions;
export default taskFormSlice.reducer;
