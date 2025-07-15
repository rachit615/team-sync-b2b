import React from "react";

import { Stack } from "expo-router";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
