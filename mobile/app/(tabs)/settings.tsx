import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { router } from "expo-router";

const settingsOptions = [
  {
    section: "Account",
    items: [
      { icon: "person-outline", title: "Profile Information", subtitle: "Manage your personal details", route: "/settings/profile" },
      { icon: "card-outline", title: "Payment Methods", subtitle: "Manage cards and billing", route: "/settings/payment" },
      { icon: "shield-checkmark-outline", title: "Privacy & Security", subtitle: "Password and privacy settings", route: "/settings/privacy" }
    ]
  },
  {
    section: "Preferences",
    items: [
      { icon: "notifications-outline", title: "Notifications", subtitle: "Push notifications and alerts", route: "/settings/notifications" },
      { icon: "language-outline", title: "Language", subtitle: "English (US)", route: "/settings/language" },
      { icon: "moon-outline", title: "Dark Mode", subtitle: "Appearance settings", route: "/settings/dark-mode" }
    ]
  },
  {
    section: "Support",
    items: [
      { icon: "help-circle-outline", title: "Help Center", subtitle: "FAQs and support articles", route: "/settings/help-center" },
      { icon: "chatbubble-outline", title: "Contact Us", subtitle: "Get in touch with support", route: "/settings/contact" },
      { icon: "star-outline", title: "Rate App", subtitle: "Share your feedback", route: "/settings/rate-app" }
    ]
  },
  {
    section: "Legal",
    items: [
      { icon: "document-text-outline", title: "Terms of Service", subtitle: "Read our terms", route: "/settings/terms" },
      { icon: "lock-closed-outline", title: "Privacy Policy", subtitle: "Your privacy matters", route: "/settings/privacy-policy" }
    ]
  }
];

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { colors, isDark } = useTheme();

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/(auth)/getstarted");
          }
        }
      ]
    );
  };

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  const renderSettingItem = (item: typeof settingsOptions[0]['items'][0]) => (
    <Pressable 
      key={item.title} 
      style={styles.settingItem}
      onPress={() => handleNavigate(item.route)}
    >
      <View style={[styles.settingIcon, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}>
        <Ionicons name={item.icon as any} size={20} color={colors.textSecondary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={16} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* User Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
        <Image 
          source={{ uri: user?.profileImage || `https://api.dicebear.com/7.x/avataaars/png?seed=${user?.username || 'default'}` }} 
          style={styles.avatarImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>{user?.username || "Welcome back!"}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user?.email || "user@example.com"}</Text>
        </View>
        <Pressable 
          style={[styles.editProfileButton, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}
          onPress={() => handleNavigate("/settings/profile")}
        >
          <Ionicons name="create-outline" size={18} color={colors.primary} />
        </Pressable>
      </View>

      {/* Settings Sections */}
      {settingsOptions.map((section) => (
        <View key={section.section} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.section}</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
            {section.items.map((item, index) => (
              <View key={item.title}>
                {renderSettingItem(item)}
                {index < section.items.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Sign Out Button */}
      <View style={styles.section}>
        <Pressable style={[styles.signOutButton, { backgroundColor: colors.surface, borderColor: colors.error }]} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[styles.signOutText, { color: colors.error }]}>Sign Out</Text>
        </Pressable>
      </View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>Travel Booking App v1.0.0</Text>
      </View>

      {/* Bottom spacing for tab bar */}
      <View style={styles.bottomSpacing} />
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
    paddingTop: 70,
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
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  editProfileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
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
  bottomSpacing: {
    height: 100,
  },
});
