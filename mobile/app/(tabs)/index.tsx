import React, { useState, useRef, useEffect } from "react";
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
  Modal,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { categories, extendedCategories } from "../../constants/Categories";
import { destinationsApi, authApi } from "../../lib/api";

const { width } = Dimensions.get('window');

// Available locations for dropdown
const availableLocations = [
  { id: 1, name: "All Locations", country: "" },
  { id: 2, name: "Bali", country: "Indonesia" },
  { id: 3, name: "Paris", country: "France" },
  { id: 4, name: "Tokyo", country: "Japan" },
  { id: 5, name: "New York", country: "USA" },
  { id: 6, name: "London", country: "UK" },
  { id: 7, name: "Dubai", country: "UAE" },
  { id: 8, name: "Rome", country: "Italy" },
];

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const { colors, isDark } = useTheme();
  const { bookings } = useBooking();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showHeartAnimation, setShowHeartAnimation] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(availableLocations[0]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(1)).current;
  const heartTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadDestinations();
    loadFavorites();
  }, []);

  const loadDestinations = async () => {
    try {
      const data = await destinationsApi.getAll();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to load destinations", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const data = await authApi.getFavorites();
      const favoriteIds = new Set<string>(data.favorites.map((f: any) => f._id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  // Count confirmed bookings for notification badge
  const confirmedBookingsCount = bookings.filter(b => b.status === "confirmed").length;

  // Filter destinations based on search query, category, and location
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      destination.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesLocation = !selectedLocation.country || 
      destination.country?.toLowerCase().includes(selectedLocation.country.toLowerCase()) ||
      destination.location?.toLowerCase().includes(selectedLocation.name.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Destinations filtered by category (for explore section)
  const displayDestinations = selectedCategory || selectedLocation.country
    ? filteredDestinations
    : destinations;

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowSearchResults(text.length > 0);
  };

  const handleSearchResultPress = (destinationId: string) => {
    setSearchQuery("");
    setShowSearchResults(false);
    router.push(`/property-details?id=${destinationId}`);
  };

  const toggleFavorite = async (id: string) => {
    const isCurrentlyFavorited = favorites.has(id);
    
    // Optimistic update
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });

    try {
      await authApi.toggleFavorite(id);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      // Revert on error
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (isCurrentlyFavorited) {
          newFavorites.add(id);
        } else {
          newFavorites.delete(id);
        }
        return newFavorites;
      });
      return;
    }

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ImageBackground
        source={require("../../assets/images/skyblue.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: isDark ? 0.1 : 0.25 }}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Pressable style={[styles.locationButton, { backgroundColor: colors.surface }]}>
              <Ionicons name="location-outline" size={24} color={colors.text} />
            </Pressable>
            <Pressable onPress={() => setShowLocationDropdown(!showLocationDropdown)}>
              <Text style={[styles.locationLabel, { color: colors.textSecondary }]}>Location</Text>
              <View style={styles.locationRow}>
                <Text style={[styles.locationText, { color: colors.text }]}>
                  {selectedLocation.country ? `${selectedLocation.name}, ${selectedLocation.country}` : selectedLocation.name}
                </Text>
                <Ionicons name={showLocationDropdown ? "chevron-up" : "chevron-down"} size={12} color={colors.textSecondary} />
              </View>
            </Pressable>
          </View>
          <Pressable 
            style={[styles.notificationButton, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/(tabs)/schedule")}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            {confirmedBookingsCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {confirmedBookingsCount > 9 ? "9+" : confirmedBookingsCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Location Dropdown */}
        {showLocationDropdown && (
          <View style={[styles.locationDropdown, { backgroundColor: colors.surface }]}>
            {availableLocations.map((location) => (
              <Pressable
                key={location.id}
                style={[
                  styles.locationDropdownItem,
                  selectedLocation.id === location.id && { backgroundColor: isDark ? colors.background : "#F3F4F6" }
                ]}
                onPress={() => {
                  setSelectedLocation(location);
                  setShowLocationDropdown(false);
                }}
              >
                <Ionicons 
                  name={location.country ? "location" : "globe-outline"} 
                  size={18} 
                  color={selectedLocation.id === location.id ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  styles.locationDropdownText,
                  { color: selectedLocation.id === location.id ? colors.primary : colors.text }
                ]}>
                  {location.country ? `${location.name}, ${location.country}` : location.name}
                </Text>
                {selectedLocation.id === location.id && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
            <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search your place"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => { setSearchQuery(""); setShowSearchResults(false); }}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>
          
          {/* Search Results Dropdown */}
          {showSearchResults && (
            <View style={[styles.searchResultsContainer, { backgroundColor: colors.surface }]}>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.slice(0, 5).map((destination) => (
                  <Pressable
                    key={destination._id}
                    style={[styles.searchResultItem, { borderBottomColor: colors.border }]}
                    onPress={() => handleSearchResultPress(destination._id)}
                  >
                    <Ionicons name="location-outline" size={18} color={colors.textSecondary} />
                    <View style={styles.searchResultText}>
                      <Text style={[styles.searchResultName, { color: colors.text }]}>{destination.name}</Text>
                      <Text style={[styles.searchResultLocation, { color: colors.textSecondary }]}>{destination.location}, {destination.country}</Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>No places found</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Popular Place Category */}
        <View style={styles.section}>
          <View style={styles.categoryHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>    Popular Place Category</Text>
            {selectedCategory && (
              <Pressable onPress={() => setSelectedCategory(null)} style={styles.clearFilterButton}>
                <Text style={[styles.clearFilterText, { color: colors.primary }]}>Clear Filter</Text>
              </Pressable>
            )}
          </View>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <Pressable 
                key={category.id} 
                style={({ pressed }) => [
                  styles.categoryCard,
                  { backgroundColor: colors.surface },
                  selectedCategory === category.name && { backgroundColor: colors.primary, borderColor: colors.primary },
                  pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
                ]}
                onPress={() => {
                  if (category.name === "More") {
                    setIsModalVisible(true);
                  } else {
                    // Toggle category filter
                    setSelectedCategory(selectedCategory === category.name ? null : category.name);
                  }
                }}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryName, 
                  { color: selectedCategory === category.name ? "#FFFFFF" : colors.text }
                ]}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Explore the World */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedCategory ? `${selectedCategory} Destinations` : "Explore the World"}
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/booking")}>
              <Text style={[styles.seeAllText, { color: colors.textSecondary }]}>See all</Text>
            </Pressable>
          </View>

          {/* Property Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.propertiesScroll}
          >
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginLeft: 20 }} />
            ) : displayDestinations.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
                  No destinations found for this filter
                </Text>
              </View>
            ) : (
              displayDestinations.map((destination) => (
                <Pressable 
                  key={destination._id} 
                  style={styles.propertyCard}
                  onPress={() => router.push(`/property-details?id=${destination._id}`)}
                >
                  <ImageBackground
                    source={{ uri: destination.imageUrl }}
                    style={styles.propertyImage}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode="cover"
                  >
                    {/* Top overlay - Price and Favorite */}
                    <View style={styles.topOverlay}>
                      <View style={styles.priceTag}>
                        <Text style={styles.priceText}>
                          ₱{destination.price.toLocaleString()}
                          <Text style={styles.priceSubtext}> /Night</Text>
                        </Text>
                      </View>
                      <Pressable 
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(destination._id)}
                      >
                        <Ionicons 
                          name={favorites.has(destination._id) ? "heart" : "heart-outline"} 
                          size={18} 
                        color={favorites.has(destination._id) ? "#FF385C" : "#FFF"} 
                      />
                      {/* Floating Heart Animation */}
                      {showHeartAnimation === destination._id && (
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
            ))
            )}
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
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>All Categories</Text>
              <Pressable 
                style={[styles.closeButton, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Ionicons name="close" size={28} color={colors.text} />
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
                      { backgroundColor: colors.surface, borderColor: colors.border },
                      selectedCategory === category.name && { backgroundColor: colors.primary, borderColor: colors.primary },
                      pressed && { backgroundColor: isDark ? colors.background : "#F3F4F6", transform: [{ scale: 0.98 }] }
                    ]}
                    onPress={() => {
                      setSelectedCategory(selectedCategory === category.name ? null : category.name);
                      setIsModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalCategoryIcon}>{category.icon}</Text>
                    <Text style={[
                      styles.modalCategoryName, 
                      { color: selectedCategory === category.name ? "#FFFFFF" : colors.text }
                    ]}>{category.name}</Text>
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
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  notificationBadgeText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  locationDropdown: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 80,
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 1000,
    overflow: "hidden",
  },
  locationDropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  locationDropdownText: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  searchWrapper: {
    marginHorizontal: 20,
    marginBottom: 24,
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
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
  searchResultsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    maxHeight: 250,
    overflow: "hidden",
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchResultText: {
    marginLeft: 12,
    flex: 1,
  },
  searchResultName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  searchResultLocation: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  noResultsContainer: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    marginBottom: 22,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  clearFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearFilterText: {
    fontSize: 14,
    fontWeight: "600",
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