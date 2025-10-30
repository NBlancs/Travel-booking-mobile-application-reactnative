import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function NotificationsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [travelTips, setTravelTips] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Channels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Channels</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Push Notifications</Text>
                <Text style={styles.menuItemSubtext}>Receive in-app alerts</Text>
              </View>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={pushEnabled ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Email Notifications</Text>
                <Text style={styles.menuItemSubtext}>Receive updates via email</Text>
              </View>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={emailEnabled ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="chatbox-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>SMS Notifications</Text>
                <Text style={styles.menuItemSubtext}>Receive text messages</Text>
              </View>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={smsEnabled ? "#2563EB" : "#F3F4F6"}
            />
          </View>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Receive</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Booking Updates</Text>
                <Text style={styles.menuItemSubtext}>Trip confirmations & changes</Text>
              </View>
            </View>
            <Switch
              value={bookingUpdates}
              onValueChange={setBookingUpdates}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={bookingUpdates ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="pricetag-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Special Offers</Text>
                <Text style={styles.menuItemSubtext}>Deals and promotions</Text>
              </View>
            </View>
            <Switch
              value={specialOffers}
              onValueChange={setSpecialOffers}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={specialOffers ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="bulb-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Travel Tips</Text>
                <Text style={styles.menuItemSubtext}>Recommendations & guides</Text>
              </View>
            </View>
            <Switch
              value={travelTips}
              onValueChange={setTravelTips}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={travelTips ? "#2563EB" : "#F3F4F6"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="trending-down-outline" size={20} color="#6B7280" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>Price Alerts</Text>
                <Text style={styles.menuItemSubtext}>Price drops on saved trips</Text>
              </View>
            </View>
            <Switch
              value={priceAlerts}
              onValueChange={setPriceAlerts}
              trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
              thumbColor={priceAlerts ? "#2563EB" : "#F3F4F6"}
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
