import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const faqs = [
  {
    question: "How do I book a property?",
    answer: "Browse properties on the home screen, select one you like, and tap the 'Book Now' button. Follow the prompts to complete your reservation.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel bookings from the Schedule tab. Cancellation policies vary by property, so please check the specific terms when booking.",
  },
  {
    question: "How do I change my payment method?",
    answer: "Go to Settings > Payment Methods to add, remove, or set a default payment card for your bookings.",
  },
  {
    question: "What if I need to modify my dates?",
    answer: "You can modify your booking dates from the Schedule tab. Select your booking and tap 'Modify Dates'. Note that changes are subject to availability.",
  },
  {
    question: "How do I contact property owners?",
    answer: "Once you've made a booking, you can message the property owner directly through the app's messaging feature in your booking details.",
  },
  {
    question: "Are there hidden fees?",
    answer: "No, all fees are displayed upfront during the booking process, including cleaning fees, service charges, and taxes.",
  },
];

export default function HelpCenterScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.actionText}>Live Chat</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="call-outline" size={24} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Call Support</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="mail-outline" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.actionText}>Email Us</Text>
          </Pressable>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {filteredFaqs.map((faq, index) => (
            <Pressable
              key={index}
              style={styles.faqItem}
              onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedIndex === index && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </Pressable>
          ))}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
    textAlign: "center",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  faqItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
