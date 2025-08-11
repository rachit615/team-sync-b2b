import { Stack } from "expo-router";

export default function NotificationsLayout() {
  return (
    <Stack>
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
    </Stack>
  );
}
