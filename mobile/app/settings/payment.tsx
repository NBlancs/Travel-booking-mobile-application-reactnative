import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "09/26", isDefault: false },
];

export default function PaymentMethodsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.cardItem}>
              <View style={styles.cardIcon}>
                <Ionicons name="card" size={24} color="#2563EB" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardType}>{method.type} •••• {method.last4}</Text>
                <Text style={styles.cardExpiry}>Expires {method.expiry}</Text>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
              <Pressable style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Add New Card Button */}
        <Pressable style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#2563EB" />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </Pressable>

        {/* Billing Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>123 Travel Street</Text>
            <Text style={styles.addressText}>Adventure City, AC 12345</Text>
            <Text style={styles.addressText}>United States</Text>
            <Pressable style={styles.editLink}>
              <Text style={styles.editLinkText}>Edit Address</Text>
            </Pressable>
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
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: "#6B7280",
  },
  defaultBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  moreButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    marginLeft: 8,
  },
  addressCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },
  addressText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  editLink: {
    marginTop: 12,
  },
  editLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  bottomSpacing: {
    height: 40,
  },
});
