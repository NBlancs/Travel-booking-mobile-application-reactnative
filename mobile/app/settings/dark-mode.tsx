import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DarkModeScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoMode, setAutoMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Customize how the app looks on your device
        </Text>

        {/* Theme Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          
          <Pressable 
            style={styles.themeOption}
            onPress={() => {
              setDarkMode(false);
              setAutoMode(false);
            }}
          >
            <View style={styles.themeIconContainer}>
              <Ionicons name="sunny" size={32} color="#F59E0B" />
            </View>
            <View style={styles.themeTextContainer}>
              <Text style={styles.themeTitle}>Light Mode</Text>
              <Text style={styles.themeDescription}>Classic bright appearance</Text>
            </View>
            {!darkMode && !autoMode && (
              <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
            )}
          </Pressable>

          <Pressable 
            style={styles.themeOption}
            onPress={() => {
              setDarkMode(true);
              setAutoMode(false);
            }}
          >
            <View style={styles.themeIconContainer}>
              <Ionicons name="moon" size={32} color="#6366F1" />
            </View>
            <View style={styles.themeTextContainer}>
              <Text style={styles.themeTitle}>Dark Mode</Text>
              <Text style={styles.themeDescription}>Easy on the eyes in low light</Text>
            </View>
            {darkMode && !autoMode && (
              <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
            )}
          </Pressable>

          <Pressable 
            style={styles.themeOption}
            onPress={() => {
              setAutoMode(true);
            }}
          >
            <View style={styles.themeIconContainer}>
              <Ionicons name="contrast" size={32} color="#8B5CF6" />
            </View>
            <View style={styles.themeTextContainer}>
              <Text style={styles.themeTitle}>Auto</Text>
              <Text style={styles.themeDescription}>Matches system settings</Text>
            </View>
            {autoMode && (
              <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
            )}
          </Pressable>
        </View>

        {/* Additional Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="color-palette-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Use AMOLED Black</Text>
                <Text style={styles.menuItemSubtext}>Pure black for dark mode</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={darkMode ? "#2563EB" : "#F3F4F6"}
              disabled={!darkMode}
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    padding: 20,
    paddingBottom: 8,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  themeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  themeTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  themeDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  menuItemSubtext: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  bottomSpacing: {
    height: 40,
  },
});
