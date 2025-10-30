import React, { useState, useRef } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { destinations, categories, extendedCategories } from "../../data/destinations";

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showHeartAnimation, setShowHeartAnimation] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(1)).current;
  const heartTranslateY = useRef(new Animated.Value(0)).current;

  const toggleFavorite = (id: number) => {
    const isCurrentlyFavorited = favorites.has(id);
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });

    // Show animation only when favoriting (not unfavoriting)
    if (!isCurrentlyFavorited) {
      setShowHeartAnimation(id);
      
      // Reset animation values
      heartScale.setValue(0);
      heartOpacity.setValue(1);
      heartTranslateY.setValue(0);

      // Run animations
      Animated.parallel([
        Animated.sequence([
          Animated.spring(heartScale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(heartScale, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 800,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(heartTranslateY, {
          toValue: -80,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowHeartAnimation(null);
      });
    }
  };

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
          <Text style={styles.sectionTitle}>    Popular Place Category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <Pressable 
                key={category.id} 
                style={({ pressed }) => [
                  styles.categoryCard,
                  pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
                ]}
                onPress={() => {
                  if (category.name === "More") {
                    setIsModalVisible(true);
                  } else {
                    // Handle other category clicks
                    console.log(`${category.name} category clicked`);
                    // You can add navigation or filtering logic here
                  }
                }}
              >
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
              <Pressable 
                key={destination.id} 
                style={styles.propertyCard}
                onPress={() => router.push(`/property-details?id=${destination.id}`)}
              >
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
                    <Pressable 
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(destination.id)}
                    >
                      <Ionicons 
                        name={favorites.has(destination.id) ? "heart" : "heart-outline"} 
                        size={18} 
                        color={favorites.has(destination.id) ? "#FF385C" : "#FFF"} 
                      />
                      {/* Floating Heart Animation */}
                      {showHeartAnimation === destination.id && (
                        <Animated.View
                          style={[
                            styles.floatingHeart,
                            {
                              transform: [
                                { scale: heartScale },
                                { translateY: heartTranslateY }
                              ],
                              opacity: heartOpacity,
                            },
                          ]}
                        >
                          <Ionicons name="heart" size={50} color="#FF385C" />
                        </Animated.View>
                      )}
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

      {/* Categories Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable 
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Categories</Text>
              <Pressable 
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Ionicons name="close" size={28} color="#333" />
              </Pressable>
            </View>

            {/* Modal Categories Grid */}
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.modalCategoriesGrid}>
                {extendedCategories.map((category) => (
                  <Pressable 
                    key={category.id} 
                    style={({ pressed }) => [
                      styles.modalCategoryCard,
                      pressed && { backgroundColor: "#F3F4F6", transform: [{ scale: 0.98 }] }
                    ]}
                    onPress={() => {
                      setIsModalVisible(false);
                      console.log(`${category.name} category selected`);
                      // Add your category filter/navigation logic here
                    }}
                  >
                    <Text style={styles.modalCategoryIcon}>{category.icon}</Text>
                    <Text style={styles.modalCategoryName}>{category.name}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
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
    marginBottom: 22,
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
    height: 350,
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
    overflow: "visible",
  },
  floatingHeart: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 4,
  },
  modalCategoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  modalCategoryCard: {
    width: "31%", // 3 cards per row with space between
    aspectRatio: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  modalCategoryIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  modalCategoryName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});