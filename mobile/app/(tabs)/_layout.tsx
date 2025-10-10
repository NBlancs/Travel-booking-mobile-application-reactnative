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
        headerShown: false,
        tabBarButton: (p) => <TabBarButton {...p} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
          name="booking"
          options={{
            title: "Booking",
            tabBarIcon: ({ color, size }) => <Ionicons name="airplane" color={color} size={size}/>,
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
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}