import React from "react";

import { Stack } from "expo-router";
import "react-native-reanimated";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="homeScreen"
        options={{ headerShown: false, title: "Home" }}
      />
    </Stack>
  );
}
