import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { destinations } from "../data/destinations";

const { width, height } = Dimensions.get("window");

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const destination = destinations.find((d) => d.id === Number(id));
  const [isFavorite, setIsFavorite] = useState(false);

  if (!destination) {
    return (
      <View style={styles.container}>
        <Text>Property not found</Text>
      </View>
    );
  }

  // Property details based on destination
  const propertyDetails = {
    guests: "10+ guests",
    bedrooms: "4 bedrooms",
    beds: "8 beds",
    bathrooms: "4 bath",
    address: getAddress(destination),
    description: getDescription(destination),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Image Section */}
      <View style={styles.heroSection}>
        <Image
          source={destination.image}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        {/* Curved Bottom Overlay */}
        <View style={styles.curvedOverlay}>
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{propertyDetails.guests}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{propertyDetails.bedrooms}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{propertyDetails.beds}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{propertyDetails.bathrooms}</Text>
            </View>
          </View>
        </View>

        {/* Header Buttons */}
        <View style={styles.headerButtons}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>Details</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF385C" : "#000"}
            />
          </Pressable>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView
        style={styles.contentSection}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Title */}
        <Text style={styles.propertyTitle}>
          {destination.name === "Osaka" || destination.name === "Kuala Lumpur" || destination.name === "Buenos Aires"
            ? `${destination.name} Luxury Oceanview Villa by Are Amar Stays`
            : `${destination.name} Luxury Villa by Are Amar Stays`}
        </Text>

        {/* Address */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={18} color="#666" />
          <Text style={styles.addressText}>{propertyDetails.address}</Text>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {propertyDetails.description}
          </Text>
        </View>

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <Pressable>
            <Text style={styles.seeAllLink}>See All</Text>
          </Pressable>
        </View>

        {/* Spacing before footer */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Footer with Price and Book Button */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceAmount}>{destination.priceFormatted}</Text>
          <Text style={styles.priceLabel}>/night</Text>
        </View>
        <Pressable style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Helper function to generate address based on destination
function getAddress(destination: any): string {
  const addresses: { [key: string]: string } = {
    "Osaka": "6 Akanthous Street, Cyprus",
    "Kuala Lumpur": "15 Jalan Ampang, Kuala Lumpur",
    "Buenos Aires": "25 Avenida Corrientes, Buenos Aires",
    "New York City": "350 5th Avenue, New York",
    "Rome": "12 Via del Corso, Rome",
    "London": "10 Downing Street, London",
    "Bali": "45 Jalan Raya Ubud, Bali",
    "Sydney Opera House": "Bennelong Point, Sydney",
    "Dubai": "Sheikh Zayed Road, Dubai",
    "Istanbul": "Sultanahmet Square, Istanbul",
    "Barcelona": "La Rambla 100, Barcelona",
    "Santorini": "Oia Village, Santorini",
    "Kyoto Temples": "Kiyomizu-dera, Kyoto",
    "Paris": "Champs-Élysées Avenue, Paris",
    "Machu Picchu": "Aguas Calientes, Peru",
    "Prague": "Old Town Square, Prague",
    "Cameroon/ Kribi Beach": "Beach Road, Kribi",
    "Fiji": "Coral Coast, Fiji Islands",
    "Petra": "Wadi Musa, Ma'an",
    "Great Wall of China": "Mutianyu Section, Beijing",
  };
  return addresses[destination.name] || `${destination.location}, ${destination.country}`;
}

// Helper function to generate description based on destination
function getDescription(destination: any): string {
  const descriptions: { [key: string]: string } = {
    "Osaka": "Luxurious oceanview villa in Coral Bay with private pool, modern amenities, elegant interiors, perfect for families and romantic getaways.",
    "Kuala Lumpur": "Modern luxury villa in the heart of Kuala Lumpur with stunning city views, infinity pool, and world-class amenities for an unforgettable stay.",
    "Buenos Aires": "Elegant villa in Buenos Aires featuring contemporary design, private garden, rooftop terrace, and proximity to vibrant cultural attractions.",
    "New York City": "Sophisticated urban villa in Manhattan with panoramic city views, luxury furnishings, and exclusive access to premium NYC attractions.",
    "Rome": "Historic luxury villa near ancient landmarks with Italian garden, marble interiors, and authentic Roman architectural details.",
    "London": "Prestigious villa in central London offering refined British elegance, private courtyard, and easy access to iconic landmarks.",
    "Bali": "Tropical paradise villa surrounded by lush rice terraces, infinity pool overlooking valleys, traditional Balinese architecture with modern luxury.",
    "Sydney Opera House": "Waterfront luxury villa with unobstructed harbour views, contemporary Australian design, and steps from the iconic Opera House.",
    "Dubai": "Opulent desert villa with Arabian architectural elements, private infinity pool, panoramic skyline views, and ultra-modern amenities.",
    "Istanbul": "Exquisite Bosphorus-side villa blending Ottoman elegance with modern comfort, private terrace, and breathtaking strait views.",
    "Barcelona": "Mediterranean villa near the beach with Gaudí-inspired design, rooftop pool, and vibrant Catalan cultural surroundings.",
    "Santorini": "Iconic white-washed villa perched on caldera cliffs with infinity pool, stunning sunset views, and authentic Cycladic charm.",
    "Kyoto Temples": "Traditional Japanese villa with zen garden, tatami rooms, natural hot spring bath, and serene mountain views.",
    "Paris": "Chic Parisian villa with Haussmann architecture, private courtyard, designer interiors, and views of the Eiffel Tower.",
    "Machu Picchu": "Mountain retreat villa with panoramic Andean views, terraced gardens, stone architecture, and mystical atmosphere.",
    "Prague": "Fairytale castle-style villa in historic district with Gothic details, tower views, and enchanting Old Town proximity.",
    "Cameroon/ Kribi Beach": "Beachfront tropical villa with direct ocean access, palm-fringed gardens, and tranquil coastal atmosphere.",
    "Fiji": "Private island villa surrounded by crystal-clear waters, overwater bungalow style, and pristine coral reef access.",
    "Petra": "Desert luxury villa carved into rose-red cliffs with ancient Nabataean-inspired design and starlit terrace.",
    "Great Wall of China": "Heritage villa at the foot of the Great Wall with traditional Chinese courtyard, imperial architecture, and mountain vistas.",
  };
  return descriptions[destination.name] || "Luxurious villa with private pool, modern amenities, elegant interiors, perfect for families and romantic getaways.";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  heroSection: {
    height: height * 0.55,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  curvedOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  badge: {
    flex: 1,
    backgroundColor: "rgba(69, 90, 100, 0.85)",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  headerButtons: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF",
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentSection: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginTop: 16,
    lineHeight: 32,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  descriptionSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    fontWeight: "400",
  },
  gallerySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  seeAllLink: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  bookButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  bookButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
