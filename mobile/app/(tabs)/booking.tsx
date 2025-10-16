import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Pressable, Dimensions } from "react-native";
import { destinations, Destination } from "../../data/destinations";

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with padding

export default function BookingScreen() {
  const renderDestinationCard = (destination: Destination) => (
    <Pressable key={destination.id} style={styles.card}>
      <Image source={destination.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.destinationName}>{destination.name}</Text>
        <Text style={styles.countryName}>{destination.country}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>{destination.priceFormatted}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {destination.rating}</Text>
          </View>
        </View>
      </View>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  countryName: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#6B7280",
  },
});
