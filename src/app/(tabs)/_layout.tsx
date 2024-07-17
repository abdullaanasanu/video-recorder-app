import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/src/components/navigation/TabBarIcon";
import { Colors } from "@/src/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
        tabBarStyle: {
          height: 55,
          paddingBottom: 5,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}
    >
      <Tabs.Screen
        name="(files)"
        options={{
          title: "Files",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "file" : "file-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "account" : "account-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
