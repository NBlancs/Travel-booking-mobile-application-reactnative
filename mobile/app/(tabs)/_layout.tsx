import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

const TabBarButton = React.forwardRef<any, BottomTabBarButtonProps>(({ children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      {...props}
      // No ripple on Android
      android_ripple={undefined}
    >
      {children}
    </Pressable>
  );
});
TabBarButton.displayName = "TabBarButton";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarButton: (p) => <TabBarButton {...p} />,
      }}
    >
      {/* ...existing code... */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
        }}
      />
      {/* ...existing code... */}
    </Tabs>
  );
}