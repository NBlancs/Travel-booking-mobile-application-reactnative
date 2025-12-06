import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function PrivacyPolicyScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.documentContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>Last updated: January 2024</Text>

          <View style={[styles.introSection, { backgroundColor: colors.background }]}>
            <Text style={[styles.introText, { color: colors.text }]}>
              At TravelBooking, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Information We Collect</Text>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Personal Information</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We may collect personal information that you voluntarily provide to us when you:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Register for an account</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Make a booking or reservation</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Update your profile information</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Contact customer support</Text>
            </View>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              This information may include your name, email address, phone number, payment information, and travel preferences.
            </Text>

            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Usage Data</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We automatically collect certain information when you use our app, including:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Device information (model, OS version)</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• App usage statistics</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Location data (with your permission)</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Search queries and preferences</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>2. How We Use Your Information</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We use the information we collect to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Process your bookings and reservations</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Provide customer support</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Send booking confirmations and updates</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Personalize your experience</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Improve our services</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Send promotional offers (with your consent)</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Prevent fraud and enhance security</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Information Sharing</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We may share your information with:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Property owners to process bookings</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Payment processors for transactions</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Service providers who assist our operations</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Law enforcement when required by law</Text>
            </View>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We do not sell your personal information to third parties.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Data Security</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>5. Your Privacy Rights</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              You have the right to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Access your personal information</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Correct inaccurate data</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Request deletion of your data</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Opt-out of marketing communications</Text>
              <Text style={[styles.bulletItem, { color: colors.textSecondary }]}>• Withdraw consent for data processing</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>6. Cookies and Tracking</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We use cookies and similar tracking technologies to track activity on our app and hold certain information. You can control cookie settings through your device preferences.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>7. Children's Privacy</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              Our app is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>8. Data Retention</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>9. Changes to This Policy</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>10. Contact Us</Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              If you have any questions about this Privacy Policy, please contact us:
            </Text>
            <Text style={[styles.contactInfo, { color: colors.primary }]}>Email: privacy@travelapp.com</Text>
            <Text style={[styles.contactInfo, { color: colors.primary }]}>Phone: +1 (555) 123-4567</Text>
            <Text style={[styles.contactInfo, { color: colors.primary }]}>Address: 123 Privacy Street, San Francisco, CA 94102</Text>
          </View>

          <View style={[styles.privacyBox, { backgroundColor: colors.background }]}>
            <Ionicons name="lock-closed" size={48} color={colors.primary} />
            <Text style={[styles.privacyText, { color: colors.text }]}>
              Your privacy is important to us. We are committed to protecting your personal information and being transparent about our data practices.
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
    marginBottom: 16,
    fontStyle: "italic",
  },
  introSection: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  introText: {
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 22,
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
  subsectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
    marginBottom: 8,
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
    marginBottom: 12,
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
  privacyBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 16,
  },
  privacyText: {
    fontSize: 13,
    color: "#1E40AF",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
