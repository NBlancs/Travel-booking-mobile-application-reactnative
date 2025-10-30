import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PrivacySecurityScreen() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password</Text>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="key-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Security Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Options</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Two-Factor Authentication</Text>
                <Text style={styles.menuItemSubtext}>Add extra security layer</Text>
              </View>
            </View>
            <Switch
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={twoFactorAuth ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="finger-print-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Biometric Login</Text>
                <Text style={styles.menuItemSubtext}>Use fingerprint or face ID</Text>
              </View>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={biometric ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Login Alerts</Text>
                <Text style={styles.menuItemSubtext}>Get notified of new logins</Text>
              </View>
            </View>
            <Switch
              value={loginAlerts}
              onValueChange={setLoginAlerts}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={loginAlerts ? "#2563EB" : "#F3F4F6"}
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="eye-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>Profile Visibility</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.valueText}>Public</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="location-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>Location Services</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.valueText}>Enabled</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="analytics-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>Data & Analytics</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Active Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Sessions</Text>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="desktop-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Manage Devices</Text>
                <Text style={styles.menuItemSubtext}>3 active sessions</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
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
    marginLeft: 12,
  },
  menuItemSubtext: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});
