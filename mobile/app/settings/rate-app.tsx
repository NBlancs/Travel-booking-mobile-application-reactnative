import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RateAppScreen() {
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Rate App</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* App Icon */}
        <View style={styles.appIconContainer}>
          <View style={styles.appIcon}>
            <Ionicons name="airplane" size={48} color="#2563EB" />
          </View>
          <Text style={styles.appName}>TravelBooking</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>How would you rate your experience?</Text>
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
                  color={star <= (hoveredRating || rating) ? "#F59E0B" : "#D1D5DB"}
                />
              </Pressable>
            ))}
          </View>
          <Text style={styles.ratingMessage}>{getRatingMessage()}</Text>
        </View>

        {/* Submit Button */}
        <Pressable
          style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
          onPress={handleSubmitRating}
          disabled={rating === 0}
        >
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </Pressable>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>What users love about us:</Text>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>Easy booking process</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>Wide selection of properties</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>Secure payment methods</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>24/7 customer support</Text>
          </View>
        </View>

        {/* Alternative Actions */}
        <View style={styles.alternativeActions}>
          <Pressable style={styles.alternativeButton}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#2563EB" />
            <Text style={styles.alternativeButtonText}>Send Feedback</Text>
          </Pressable>
          <Pressable style={styles.alternativeButton}>
            <Ionicons name="share-social-outline" size={20} color="#2563EB" />
            <Text style={styles.alternativeButtonText}>Share App</Text>
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
