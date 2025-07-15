import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen name="tasks" options={{ headerShown: false }} />
      <Stack.Screen name="createNewTask" options={{ headerShown: false }} />
      <Stack.Screen name="taskDetail" options={{ headerShown: false }} />
      <Stack.Screen name="teamMembers" options={{ headerShown: false }} />
    </Stack>
  );
}
