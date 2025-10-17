import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { destinations, Destination } from "../../data/destinations";

const { width } = Dimensions.get('window');
const cardWidth = (width - 32); // /2 if you want two cards per row with padding

export default function BookingScreen() {
  const renderDestinationCard = (destination: Destination) => (
    <Pressable key={destination.id} style={styles.card}>
      <ImageBackground
        source={destination.image}
        style={styles.cardImage}
        imageStyle={{ borderRadius: 12 }}
        resizeMode="cover"
      >
        {/* Top overlay - Price and Favorite */}
        <View style={styles.topOverlay}>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{destination.priceFormatted}</Text>
          </View>
          <Pressable style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={16} color="#FFF" />
          </Pressable>
        </View>

        {/* Bottom overlay - Property info */}
        <View style={styles.bottomOverlay}>
          <Text style={styles.destinationName} numberOfLines={1}>
            {destination.name}
          </Text>
          <View style={styles.locationInfo}>
            <Ionicons name="location-outline" size={10} color="#FFF" />
            <Text style={styles.countryName} numberOfLines={1}>
              {destination.country}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFC107" />
            <Text style={styles.rating}>{destination.rating}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/skyblue.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 0.25 }}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Book Your Next Adventure</Text>
            <Text style={styles.subtitle}>Discover amazing destinations around the world</Text>
          </View>

          <View style={styles.grid}>
            {destinations.map(renderDestinationCard)}
          </View>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB" 
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 16,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700", 
    color: "#1F2937",
    marginBottom: 8 
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    width: cardWidth,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  topOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
  },
  priceTag: {
    backgroundColor: "rgba(45, 55, 72, 0.85)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backdropFilter: "blur(10px)",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
  },
  favoriteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(45, 55, 72, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  bottomOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    paddingTop: 12,
    backdropFilter: "blur(10px)",
  },
  destinationName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 3,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 4,
  },
  countryName: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: "400",
    flex: 1,
    opacity: 0.95,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 100,
  },
});
