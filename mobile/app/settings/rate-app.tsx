import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function RateAppScreen() {
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitRating = () => {
    if (rating === 0) {
      Alert.alert("Please select a rating", "Tap on the stars to rate the app");
      return;
    }
    Alert.alert(
      "Thank you!",
      `You rated us ${rating} star${rating > 1 ? "s" : ""}. We appreciate your feedback!`
    );
  };

  const getRatingMessage = () => {
    if (rating === 0) return "Tap stars to rate";
    if (rating <= 2) return "We're sorry to hear that. How can we improve?";
    if (rating === 3) return "Thanks! What could we do better?";
    if (rating === 4) return "Great! Glad you're enjoying the app!";
    return "Awesome! Thank you for your support!";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Rate App</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* App Icon */}
        <View style={styles.appIconContainer}>
          <View style={[styles.appIcon, { backgroundColor: colors.surface }]}>
            <Ionicons name="airplane" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>TravelBooking</Text>
        </View>

        {/* Rating Section */}
        <View style={[styles.ratingSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.ratingTitle, { color: colors.text }]}>How would you rate your experience?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={() => setRating(star)}
                onPressIn={() => setHoveredRating(star)}
                onPressOut={() => setHoveredRating(0)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= (hoveredRating || rating) ? "star" : "star-outline"}
                  size={48}
                  color={star <= (hoveredRating || rating) ? "#F59E0B" : colors.border}
                />
              </Pressable>
            ))}
          </View>
          <Text style={[styles.ratingMessage, { color: colors.textSecondary }]}>{getRatingMessage()}</Text>
        </View>

        {/* Submit Button */}
        <Pressable
          style={[
            styles.submitButton, 
            { backgroundColor: rating === 0 ? colors.border : colors.primary }
          ]}
          onPress={handleSubmitRating}
          disabled={rating === 0}
        >
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </Pressable>

        {/* Features List */}
        <View style={[styles.featuresSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.featuresTitle, { color: colors.text }]}>What users love about us:</Text>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Easy booking process</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Wide selection of properties</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Secure payment methods</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>24/7 customer support</Text>
          </View>
        </View>

        {/* Alternative Actions */}
        <View style={styles.alternativeActions}>
          <Pressable style={[styles.alternativeButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
            <Text style={[styles.alternativeButtonText, { color: colors.primary }]}>Send Feedback</Text>
          </Pressable>
          <Pressable style={[styles.alternativeButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="share-social-outline" size={20} color={colors.primary} />
            <Text style={[styles.alternativeButtonText, { color: colors.primary }]}>Share App</Text>
          </Pressable>
        </View>
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
  contentContainer: {
    padding: 20,
  },
  appIconContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  ratingSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingMessage: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  featuresSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 12,
  },
  alternativeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alternativeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  alternativeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563EB",
    marginLeft: 8,
  },
});
