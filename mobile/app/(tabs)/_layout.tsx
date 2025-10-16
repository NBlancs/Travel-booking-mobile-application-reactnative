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
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom:10,
          left: 50,
          right: 50,
          elevation: 8,
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
          height: 70,
          paddingBottom: 0,
          paddingTop: 12,
          paddingHorizontal: 20,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          marginRight: 16,
          marginLeft: 16
        },
        tabBarItemStyle: {
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: focused ? "#2563EB" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Ionicons name="home-outline" color={focused ? "#FFFFFF" : color} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
          name="booking"
          options={{
            title: "Booking",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: focused ? "#2563EB" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Ionicons name="calendar-outline" color={focused ? "#FFFFFF" : color} size={24} />
              </View>
            ),
        }} 
        />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: focused ? "#2563EB" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Ionicons name="heart-outline" color={focused ? "#FFFFFF" : color} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: focused ? "#2563EB" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Ionicons name="person-outline" color={focused ? "#FFFFFF" : color} size={24} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}