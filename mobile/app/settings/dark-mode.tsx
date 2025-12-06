import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function DarkModeScreen() {
  const { themeMode, setThemeMode, useAmoledBlack, setUseAmoledBlack, isDark, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Customize how the app looks on your device
        </Text>

        {/* Theme Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Theme</Text>
          
          <Pressable 
            style={[styles.themeOption, { backgroundColor: colors.surface }]}
            onPress={() => setThemeMode("light")}
          >
            <View style={[styles.themeIconContainer, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}>
              <Ionicons name="sunny" size={32} color="#F59E0B" />
            </View>
            <View style={styles.themeTextContainer}>
              <Text style={[styles.themeTitle, { color: colors.text }]}>Light Mode</Text>
              <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>Classic bright appearance</Text>
            </View>
            {themeMode === "light" && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </Pressable>

          <Pressable 
            style={[styles.themeOption, { backgroundColor: colors.surface }]}
            onPress={() => setThemeMode("dark")}
          >
            <View style={[styles.themeIconContainer, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}>
              <Ionicons name="moon" size={32} color="#6366F1" />
            </View>
            <View style={styles.themeTextContainer}>
              <Text style={[styles.themeTitle, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>Easy on the eyes in low light</Text>
            </View>
            {themeMode === "dark" && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </Pressable>

          <Pressable 
            style={[styles.themeOption, { backgroundColor: colors.surface }]}
            onPress={() => setThemeMode("auto")}
          >
            <View style={[styles.themeIconContainer, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}>
              <Ionicons name="contrast" size={32} color="#8B5CF6" />
            </View>
            <View style={styles.themeTextContainer}>
              <Text style={[styles.themeTitle, { color: colors.text }]}>Auto</Text>
              <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>Matches system settings</Text>
            </View>
            {themeMode === "auto" && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </Pressable>
        </View>

        {/* Additional Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Display</Text>
          
          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="color-palette-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Use AMOLED Black</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Pure black for dark mode</Text>
              </View>
            </View>
            <Switch
              value={useAmoledBlack}
              onValueChange={setUseAmoledBlack}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={useAmoledBlack ? colors.primary : "#F3F4F6"}
              disabled={!isDark}
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
