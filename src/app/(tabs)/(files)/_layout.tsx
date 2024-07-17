import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function FileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: useThemeColor({}, "background"),
        },
        headerTintColor: useThemeColor({}, "text"),
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Files",
        }}
      />
      <Stack.Screen
        name="file/[id]"
        options={{
          title: "Editor",
        }}
      />
    </Stack>
  );
}
