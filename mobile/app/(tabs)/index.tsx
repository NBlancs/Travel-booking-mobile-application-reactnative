import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  Pressable,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { destinations, categories } from "../../data/destinations";

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/skyblue.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 0.25 }}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Pressable style={styles.locationButton}>
              <Ionicons name="location-outline" size={24} color="#333" />
            </Pressable>
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>Bali, Indonesia</Text>
                <Ionicons name="chevron-down" size={12} color="#666" />
              </View>
            </View>
          </View>
          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your place"
            placeholderTextColor="#999"
          />
        </View>

        {/* Popular Place Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Place Category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <Pressable key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Explore the World */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore the World</Text>
            <Pressable>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </View>

          {/* Property Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.propertiesScroll}
          >
            {destinations.map((destination) => (
              <Pressable key={destination.id} style={styles.propertyCard}>
                <ImageBackground
                  source={destination.image}
                  style={styles.propertyImage}
                  imageStyle={{ borderRadius: 20 }}
                  resizeMode="cover"
                >
                  {/* Top overlay - Price and Favorite */}
                  <View style={styles.topOverlay}>
                    <View style={styles.priceTag}>
                      <Text style={styles.priceText}>
                        {destination.priceFormatted}
                        <Text style={styles.priceSubtext}> /Night</Text>
                      </Text>
                    </View>
                    <Pressable style={styles.favoriteButton}>
                      <Ionicons name="heart-outline" size={18} color="#FFF" />
                    </Pressable>
                  </View>

                  {/* Bottom overlay - Property info */}
                  <View style={styles.bottomOverlay}>
                    <Text style={styles.propertyName} numberOfLines={1}>
                      {destination.name}
                    </Text>
                    <View style={styles.locationInfo}>
                      <Ionicons name="location-outline" size={12} color="#FFF" />
                      <Text style={styles.propertyLocation} numberOfLines={1}>
                        {destination.location + ", "+ destination.country}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // padding sa top
    paddingTop: 50,
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  locationButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  locationLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "400",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  notificationButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 5,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 80,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  propertiesScroll: {
    paddingLeft: 20,
  },
  propertyCard: {
    width: width * 0.85,
    height: 360,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  propertyImage: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  topOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
  },
  priceTag: {
    backgroundColor: "rgba(45, 55, 72, 0.85)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backdropFilter: "blur(10px)",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFF",
  },
  priceSubtext: {
    fontSize: 11,
    fontWeight: "400",
    color: "#E5E7EB",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(45, 55, 72, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  bottomOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
    paddingTop: 20,
    backdropFilter: "blur(10px)",
  },
  propertyName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 6,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  propertyLocation: {
    fontSize: 13,
    color: "#FFF",
    fontWeight: "400",
    flex: 1,
    opacity: 0.95,
  },
  bottomSpacing: {
    height: 10,
  },
});
