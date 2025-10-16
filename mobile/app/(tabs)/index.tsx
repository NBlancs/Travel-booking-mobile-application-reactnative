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
              <Text style={styles.locationIcon}>📍</Text>
            </Pressable>
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>Bali, Indonesia</Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </View>
            </View>
          </View>
          <Pressable style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
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
                <Image 
                  source={destination.image} 
                  style={styles.propertyImage}
                  resizeMode="cover"
                />
                <View style={styles.propertyOverlay}>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>
                      {destination.priceFormatted}
                      <Text style={styles.priceSubtext}>/Night</Text>
                    </Text>
                  </View>
                  <Pressable style={styles.favoriteButton}>
                    <Text style={styles.favoriteIcon}>🤍</Text>
                  </Pressable>
                </View>
                <View style={styles.propertyInfo}>
                  <Text style={styles.propertyName}>{destination.name}</Text>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationPin}>📍</Text>
                    <Text style={styles.propertyLocation}>{destination.location}</Text>
                  </View>
                </View>
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
  locationIcon: {
    fontSize: 24,
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
  dropdownIcon: {
    fontSize: 10,
    color: "#666",
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
  notificationIcon: {
    fontSize: 24,
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
    fontSize: 20,
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
    marginBottom: 16,
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
    backgroundColor: "#FFF",
    borderRadius: 24,
    marginRight: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  propertyImage: {
    width: "100%",
    height: 280,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  propertyOverlay: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  priceTag: {
    backgroundColor: "rgba(52, 73, 94, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  priceSubtext: {
    fontSize: 12,
    fontWeight: "400",
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  propertyInfo: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationPin: {
    fontSize: 14,
  },
  propertyLocation: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
    flex: 1,
  },
  bottomSpacing: {
    height: 10,
  },
});
