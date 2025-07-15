import { Stack } from "expo-router";

export default function WorkspaceLayout() {
  return (
    <Stack>
      <Stack.Screen name="workspace" options={{ headerShown: false }} />
    </Stack>
  );
}
