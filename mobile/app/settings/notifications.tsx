import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Switch, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { settingsStorage } from "../../lib/api";
import { useTheme } from "../../context/ThemeContext";

interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  bookingUpdates: boolean;
  specialOffers: boolean;
  travelTips: boolean;
  priceAlerts: boolean;
}

const NOTIFICATION_SETTINGS_KEY = "notification_settings";

const defaultSettings: NotificationSettings = {
  pushEnabled: true,
  emailEnabled: true,
  smsEnabled: false,
  bookingUpdates: true,
  specialOffers: true,
  travelTips: false,
  priceAlerts: true,
};

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await settingsStorage.get<NotificationSettings>(
          NOTIFICATION_SETTINGS_KEY,
          defaultSettings
        );
        setSettings(savedSettings);
      } catch (error) {
        console.log("Error loading notification settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Save settings whenever they change
  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await settingsStorage.set(NOTIFICATION_SETTINGS_KEY, newSettings);
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Channels */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notification Channels</Text>
          
          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Push Notifications</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Receive in-app alerts</Text>
              </View>
            </View>
            <Switch
              value={settings.pushEnabled}
              onValueChange={(v) => updateSetting("pushEnabled", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.pushEnabled ? colors.primary : "#F3F4F6"}
            />
          </View>

          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Email Notifications</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Receive updates via email</Text>
              </View>
            </View>
            <Switch
              value={settings.emailEnabled}
              onValueChange={(v) => updateSetting("emailEnabled", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.emailEnabled ? colors.primary : "#F3F4F6"}
            />
          </View>

          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="chatbox-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>SMS Notifications</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Receive text messages</Text>
              </View>
            </View>
            <Switch
              value={settings.smsEnabled}
              onValueChange={(v) => updateSetting("smsEnabled", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.smsEnabled ? colors.primary : "#F3F4F6"}
            />
          </View>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What to Receive</Text>
          
          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Booking Updates</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Trip confirmations & changes</Text>
              </View>
            </View>
            <Switch
              value={settings.bookingUpdates}
              onValueChange={(v) => updateSetting("bookingUpdates", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.bookingUpdates ? colors.primary : "#F3F4F6"}
            />
          </View>

          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="pricetag-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Special Offers</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Deals and promotions</Text>
              </View>
            </View>
            <Switch
              value={settings.specialOffers}
              onValueChange={(v) => updateSetting("specialOffers", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.specialOffers ? colors.primary : "#F3F4F6"}
            />
          </View>

          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="bulb-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Travel Tips</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Recommendations & guides</Text>
              </View>
            </View>
            <Switch
              value={settings.travelTips}
              onValueChange={(v) => updateSetting("travelTips", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.travelTips ? colors.primary : "#F3F4F6"}
            />
          </View>

          <View style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="trending-down-outline" size={20} color={colors.textSecondary} />
              <View style={styles.menuItemTextContainer}>
                <Text style={[styles.menuItemText, { color: colors.text }]}>Price Alerts</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textSecondary }]}>Price drops on saved trips</Text>
              </View>
            </View>
            <Switch
              value={settings.priceAlerts}
              onValueChange={(v) => updateSetting("priceAlerts", v)}
              trackColor={{ false: colors.border, true: "#93C5FD" }}
              thumbColor={settings.priceAlerts ? colors.primary : "#F3F4F6"}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
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
