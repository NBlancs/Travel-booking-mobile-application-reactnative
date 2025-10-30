import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.documentContainer}>
          <Text style={styles.lastUpdated}>Last updated: January 2024</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.paragraph}>
              By accessing and using the TravelBooking mobile application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Use License</Text>
            <Text style={styles.paragraph}>
              Permission is granted to temporarily download one copy of the materials on TravelBooking's application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </Text>
            <Text style={styles.paragraph}>
              Under this license you may not:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Modify or copy the materials</Text>
              <Text style={styles.bulletItem}>• Use the materials for any commercial purpose</Text>
              <Text style={styles.bulletItem}>• Attempt to decompile or reverse engineer any software</Text>
              <Text style={styles.bulletItem}>• Remove any copyright or proprietary notations</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Booking and Reservations</Text>
            <Text style={styles.paragraph}>
              All bookings made through our application are subject to availability and confirmation of the booking price. We reserve the right to refuse service, terminate accounts, or cancel bookings in our sole discretion.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Payment Terms</Text>
            <Text style={styles.paragraph}>
              You agree to provide current, complete, and accurate purchase and account information for all bookings made via our application. Payment must be received by us before bookings are confirmed.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Cancellation Policy</Text>
            <Text style={styles.paragraph}>
              Cancellation policies vary by property and are clearly stated during the booking process. Please review the specific cancellation policy before completing your reservation. Some bookings may be non-refundable.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. User Conduct</Text>
            <Text style={styles.paragraph}>
              You agree not to use the application to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Violate any laws or regulations</Text>
              <Text style={styles.bulletItem}>• Impersonate any person or entity</Text>
              <Text style={styles.bulletItem}>• Interfere with the proper working of the application</Text>
              <Text style={styles.bulletItem}>• Attempt to gain unauthorized access to any systems</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
              In no event shall TravelBooking or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Privacy</Text>
            <Text style={styles.paragraph}>
              Your use of the application is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the application and informs users of our data collection practices.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Modifications to Terms</Text>
            <Text style={styles.paragraph}>
              We reserve the right to revise these terms of service at any time without notice. By using this application you are agreeing to be bound by the then current version of these Terms of Service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Contact Information</Text>
            <Text style={styles.paragraph}>
              If you have any questions about these Terms of Service, please contact us at:
            </Text>
            <Text style={styles.contactInfo}>Email: legal@travelapp.com</Text>
            <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
          </View>

          <View style={styles.acceptanceBox}>
            <Ionicons name="shield-checkmark" size={48} color="#10B981" />
            <Text style={styles.acceptanceText}>
              By continuing to use TravelBooking, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </Text>
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
  documentContainer: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  lastUpdated: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 24,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 8,
  },
  bulletItem: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 14,
    color: "#2563EB",
    marginTop: 8,
  },
  acceptanceBox: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 16,
  },
  acceptanceText: {
    fontSize: 13,
    color: "#166534",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
