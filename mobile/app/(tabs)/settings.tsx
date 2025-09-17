import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

const settingsOptions = [
  {
    section: "Account",
    items: [
      { icon: "person-outline", title: "Profile Information", subtitle: "Manage your personal details" },
      { icon: "card-outline", title: "Payment Methods", subtitle: "Manage cards and billing" },
      { icon: "shield-checkmark-outline", title: "Privacy & Security", subtitle: "Password and privacy settings" }
    ]
  },
  {
    section: "Preferences",
    items: [
      { icon: "notifications-outline", title: "Notifications", subtitle: "Push notifications and alerts" },
      { icon: "language-outline", title: "Language", subtitle: "English (US)" },
      { icon: "moon-outline", title: "Dark Mode", subtitle: "Appearance settings" }
    ]
  },
  {
    section: "Support",
    items: [
      { icon: "help-circle-outline", title: "Help Center", subtitle: "FAQs and support articles" },
      { icon: "chatbubble-outline", title: "Contact Us", subtitle: "Get in touch with support" },
      { icon: "star-outline", title: "Rate App", subtitle: "Share your feedback" }
    ]
  },
  {
    section: "Legal",
    items: [
      { icon: "document-text-outline", title: "Terms of Service", subtitle: "Read our terms" },
      { icon: "lock-closed-outline", title: "Privacy Policy", subtitle: "Your privacy matters" }
    ]
  }
];

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/getstarted");
  };

  const renderSettingItem = (item: typeof settingsOptions[0]['items'][0]) => (
    <Pressable key={item.title} style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={item.icon as any} size={20} color="#6B7280" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={16} color="#9CA3AF" />
    </Pressable>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Welcome back!</Text>
          <Text style={styles.userEmail}>{user?.email || "user@example.com"}</Text>
        </View>
      </View>

      {/* Settings Sections */}
      {settingsOptions.map((section) => (
        <View key={section.section} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.section}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, index) => (
              <View key={item.title}>
                {renderSettingItem(item)}
                {index < section.items.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Sign Out Button */}
      <View style={styles.section}>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Travel Booking App v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB" 
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 68,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    padding: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
});
