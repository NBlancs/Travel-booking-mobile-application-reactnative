import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { bookingsApi, CreateBookingData, destinationsApi, authApi } from "../lib/api";
import { useBooking } from "../context/BookingContext";
import { useTheme } from "../context/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { colors, isDark } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)); // Tomorrow
  const [guests, setGuests] = useState(1);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  
  // Access booking context for notifications
  const { addBooking } = useBooking();

  useEffect(() => {
    loadDestination();
    checkIfFavorite();
  }, [id]);

  const loadDestination = async () => {
    try {
      const data = await destinationsApi.getById(id as string);
      setDestination(data);
    } catch (error) {
      console.error("Failed to load destination", error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const data = await authApi.getFavorites();
      const isFav = data.favorites.some((f: any) => f._id === id);
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Failed to check favorite", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite); // Optimistic update
      await authApi.toggleFavorite(id as string);
    } catch (error) {
      setIsFavorite(!isFavorite); // Revert on error
      console.error("Failed to toggle favorite", error);
    }
  };

  // Calculate number of nights and total price
  const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000));
  const totalPrice = destination ? destination.price * nights : 0;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!destination) {
    return (
      <View style={styles.container}>
        <Text>Property not found</Text>
      </View>
    );
  }

  // Property details based on destination
  const propertyDetails = {
    guests: destination.amenities?.guests || "2 guests",
    bedrooms: destination.amenities?.bedrooms || "1 bedroom",
    beds: destination.amenities?.beds || "1 bed",
    bathrooms: destination.amenities?.bathrooms || "1 bath",
    address: destination.address || `${destination.location}, ${destination.country}`,
    description: destination.description || "No description available.",
  };

  // Handle booking submission
  const handleBookNow = async () => {
    if (!destination) return;
    
    setIsBooking(true);
    try {
      const bookingData: CreateBookingData = {
        destinationId: destination._id,
        destinationName: destination.name,
        destinationCountry: destination.country,
        destinationImage: destination.imageUrl,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guests: guests,
        totalPrice: totalPrice,
      };
      
      const response = await bookingsApi.create(bookingData);
      
      // Add to booking context for notification badge
      addBooking(response.booking);
      
      setShowBookingModal(false);
      Alert.alert(
        "Booking Confirmed! 🎉",
        `Your trip to ${destination.name} has been booked!\n\nCheck-in: ${formatDate(checkInDate)}\nCheck-out: ${formatDate(checkOutDate)}\nGuests: ${guests}\nTotal: ₱${totalPrice.toLocaleString()}`,
        [
          {
            text: "View Schedule",
            onPress: () => router.push("/(tabs)/schedule"),
          },
          { text: "OK" },
        ]
      );
    } catch (error: any) {
      Alert.alert("Booking Failed", error.message || "Unable to complete booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date with day name for picker
  const formatDateLong = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };



  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Image Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: destination.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        {/* Curved Bottom Overlay */}
        <View style={[styles.curvedOverlay, { backgroundColor: colors.background }]}>
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
            style={[styles.backButton, { backgroundColor: colors.surface }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Details</Text>
          <Pressable
            style={[styles.favoriteButton, { backgroundColor: colors.surface }]}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF385C" : colors.text}
            />
          </Pressable>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView
        style={[styles.contentSection, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Title */}
        <Text style={[styles.propertyTitle, { color: colors.text }]}>
          {destination.name === "Osaka" || destination.name === "Kuala Lumpur" || destination.name === "Buenos Aires"
            ? `${destination.name} Luxury Oceanview Villa by Are Amar Stays`
            : `${destination.name} Luxury Villa by Are Amar Stays`}
        </Text>

        {/* Address */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.addressText, { color: colors.textSecondary }]}>{propertyDetails.address}</Text>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
            {propertyDetails.description}
          </Text>
        </View>

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Gallery</Text>
          <Pressable>
            <Text style={styles.seeAllLink}>See All</Text>
          </Pressable>
        </View>

        {/* Spacing before footer */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Footer with Price and Book Button */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceAmount, { color: colors.text }]}>{destination.priceFormatted}</Text>
          <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>/night</Text>
        </View>
        <Pressable style={styles.bookButton} onPress={() => setShowBookingModal(true)}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Book Your Stay</Text>
              <Pressable onPress={() => setShowBookingModal(false)} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>

            {/* Destination Info */}
            <View style={[styles.modalDestination, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalDestinationName, { color: colors.text }]}>{destination.name}</Text>
              <Text style={[styles.modalDestinationCountry, { color: colors.textSecondary }]}>{destination.country}</Text>
            </View>

            {/* Date Selection */}
            <View style={styles.dateSection}>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>Select Dates</Text>
              <View style={styles.dateRow}>
                <Pressable 
                  style={[styles.dateButton, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]} 
                  onPress={() => setShowCheckInPicker(true)}
                >
                  <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>Check-in</Text>
                  <Text style={[styles.dateValue, { color: colors.text }]}>{formatDate(checkInDate)}</Text>
                </Pressable>
                <Ionicons name="arrow-forward" size={20} color={colors.textSecondary} />
                <Pressable 
                  style={[styles.dateButton, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]} 
                  onPress={() => setShowCheckOutPicker(true)}
                >
                  <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>Check-out</Text>
                  <Text style={[styles.dateValue, { color: colors.text }]}>{formatDate(checkOutDate)}</Text>
                </Pressable>
              </View>
            </View>

            {/* Date Picker for Check-in */}
            {showCheckInPicker && (
              Platform.OS === 'ios' ? (
                <Modal
                  visible={showCheckInPicker}
                  transparent={true}
                  animationType="fade"
                  onRequestClose={() => setShowCheckInPicker(false)}
                >
                  <Pressable style={styles.datePickerOverlay} onPress={() => setShowCheckInPicker(false)}>
                    <View style={[styles.datePickerContent, { backgroundColor: colors.surface }]}>
                      <Text style={[styles.datePickerTitle, { color: colors.text }]}>Select Check-in Date</Text>
                      <DateTimePicker
                        testID="checkInPicker"
                        value={checkInDate}
                        mode="date"
                        display="inline"
                        onChange={(event, date) => {
                          if (date) {
                            setCheckInDate(date);
                            if (date >= checkOutDate) {
                              setCheckOutDate(new Date(date.getTime() + 86400000));
                            }
                          }
                        }}
                        minimumDate={new Date()}
                        textColor={colors.text}
                      />
                      <Pressable style={[styles.datePickerClose, { borderTopColor: colors.border }]} onPress={() => setShowCheckInPicker(false)}>
                        <Text style={[styles.datePickerCloseText, { color: colors.textSecondary }]}>Done</Text>
                      </Pressable>
                    </View>
                  </Pressable>
                </Modal>
              ) : (
                <DateTimePicker
                  testID="checkInPicker"
                  value={checkInDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowCheckInPicker(false);
                    if (event.type === 'set' && date) {
                      setCheckInDate(date);
                      if (date >= checkOutDate) {
                        setCheckOutDate(new Date(date.getTime() + 86400000));
                      }
                    }
                  }}
                  minimumDate={new Date()}
                />
              )
            )}

            {/* Date Picker for Check-out */}
            {showCheckOutPicker && (
              Platform.OS === 'ios' ? (
                <Modal
                  visible={showCheckOutPicker}
                  transparent={true}
                  animationType="fade"
                  onRequestClose={() => setShowCheckOutPicker(false)}
                >
                  <Pressable style={styles.datePickerOverlay} onPress={() => setShowCheckOutPicker(false)}>
                    <View style={[styles.datePickerContent, { backgroundColor: colors.surface }]}>
                      <Text style={[styles.datePickerTitle, { color: colors.text }]}>Select Check-out Date</Text>
                      <DateTimePicker
                        testID="checkOutPicker"
                        value={checkOutDate}
                        mode="date"
                        display="inline"
                        onChange={(event, date) => {
                          if (date) {
                            setCheckOutDate(date);
                          }
                        }}
                        minimumDate={new Date(checkInDate.getTime() + 86400000)}
                        textColor={colors.text}
                      />
                      <Pressable style={[styles.datePickerClose, { borderTopColor: colors.border }]} onPress={() => setShowCheckOutPicker(false)}>
                        <Text style={[styles.datePickerCloseText, { color: colors.textSecondary }]}>Done</Text>
                      </Pressable>
                    </View>
                  </Pressable>
                </Modal>
              ) : (
                <DateTimePicker
                  testID="checkOutPicker"
                  value={checkOutDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowCheckOutPicker(false);
                    if (event.type === 'set' && date) {
                      setCheckOutDate(date);
                    }
                  }}
                  minimumDate={new Date(checkInDate.getTime() + 86400000)}
                />
              )
            )}

            {/* Guest Counter */}
            <View style={styles.guestSection}>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>Guests</Text>
              <View style={[styles.guestCounter, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}>
                <Pressable 
                  style={[styles.counterButton, { backgroundColor: colors.surface }, guests <= 1 && styles.counterButtonDisabled]}
                  onPress={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  <Ionicons name="remove" size={20} color={guests <= 1 ? "#D1D5DB" : "#2563EB"} />
                </Pressable>
                <Text style={[styles.guestCount, { color: colors.text }]}>{guests}</Text>
                <Pressable 
                  style={[styles.counterButton, { backgroundColor: colors.surface }, guests >= 10 && styles.counterButtonDisabled]}
                  onPress={() => setGuests(Math.min(10, guests + 1))}
                  disabled={guests >= 10}
                >
                  <Ionicons name="add" size={20} color={guests >= 10 ? "#D1D5DB" : "#2563EB"} />
                </Pressable>
              </View>
            </View>

            {/* Price Summary */}
            <View style={[styles.priceSummary, { backgroundColor: isDark ? colors.background : "#F9FAFB" }]}>
              <View style={styles.priceRow}>
                <Text style={[styles.priceLabel2, { color: colors.textSecondary }]}>₱{destination.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</Text>
                <Text style={[styles.priceValue, { color: colors.text }]}>₱{(destination.price * nights).toLocaleString()}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={[styles.priceLabel2, { color: colors.textSecondary }]}>Service fee</Text>
                <Text style={[styles.priceValue, { color: colors.text }]}>₱0</Text>
              </View>
              <View style={[styles.priceDivider, { backgroundColor: colors.border }]} />
              <View style={styles.priceRow}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                <Text style={styles.totalValue}>₱{totalPrice.toLocaleString()}</Text>
              </View>
            </View>

            {/* Confirm Button */}
            <Pressable 
              style={[styles.confirmButton, isBooking && styles.confirmButtonDisabled]} 
              onPress={handleBookNow}
              disabled={isBooking}
            >
              {isBooking ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalDestination: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalDestinationName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  modalDestinationCountry: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  dateSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  dateLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  guestSection: {
    marginBottom: 20,
  },
  guestCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  guestCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginHorizontal: 30,
  },
  priceSummary: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel2: {
    fontSize: 14,
    color: "#6B7280",
  },
  priceValue: {
    fontSize: 14,
    color: "#1F2937",
  },
  priceDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  confirmButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  // Date Picker Styles
  datePickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 16,
  },
  datePickerScroll: {
    maxHeight: 300,
  },
  datePickerOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  datePickerOptionSelected: {
    backgroundColor: "#EFF6FF",
  },
  datePickerOptionText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  datePickerOptionTextSelected: {
    color: "#2563EB",
    fontWeight: "600",
  },
  datePickerClose: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  datePickerCloseText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
});
