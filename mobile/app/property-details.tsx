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
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { destinations } from "../data/destinations";
import { bookingsApi, CreateBookingData } from "../lib/api";
import { useBooking } from "../context/BookingContext";

const { width, height } = Dimensions.get("window");

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const destination = destinations.find((d) => d.id === Number(id));
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

  // Calculate number of nights and total price
  const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000));
  const totalPrice = destination ? destination.price * nights : 0;

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

  // Handle booking submission
  const handleBookNow = async () => {
    if (!destination) return;
    
    setIsBooking(true);
    try {
      const bookingData: CreateBookingData = {
        destinationId: destination.id,
        destinationName: destination.name,
        destinationCountry: destination.country,
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

  // Generate array of dates starting from a given date
  const generateDateOptions = (startDate: Date, days: number): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
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
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Your Stay</Text>
              <Pressable onPress={() => setShowBookingModal(false)} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </Pressable>
            </View>

            {/* Destination Info */}
            <View style={styles.modalDestination}>
              <Text style={styles.modalDestinationName}>{destination.name}</Text>
              <Text style={styles.modalDestinationCountry}>{destination.country}</Text>
            </View>

            {/* Date Selection */}
            <View style={styles.dateSection}>
              <Text style={styles.sectionLabel}>Select Dates</Text>
              <View style={styles.dateRow}>
                <Pressable 
                  style={styles.dateButton} 
                  onPress={() => setShowCheckInPicker(true)}
                >
                  <Text style={styles.dateLabel}>Check-in</Text>
                  <Text style={styles.dateValue}>{formatDate(checkInDate)}</Text>
                </Pressable>
                <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
                <Pressable 
                  style={styles.dateButton} 
                  onPress={() => setShowCheckOutPicker(true)}
                >
                  <Text style={styles.dateLabel}>Check-out</Text>
                  <Text style={styles.dateValue}>{formatDate(checkOutDate)}</Text>
                </Pressable>
              </View>
            </View>

            {/* Custom Date Picker Modal for Check-in */}
            <Modal
              visible={showCheckInPicker}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowCheckInPicker(false)}
            >
              <Pressable style={styles.datePickerOverlay} onPress={() => setShowCheckInPicker(false)}>
                <View style={styles.datePickerContent}>
                  <Text style={styles.datePickerTitle}>Select Check-in Date</Text>
                  <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                    {generateDateOptions(new Date(), 90).map((date) => (
                      <Pressable
                        key={date.toISOString()}
                        style={[
                          styles.datePickerOption,
                          checkInDate.toDateString() === date.toDateString() && styles.datePickerOptionSelected
                        ]}
                        onPress={() => {
                          setCheckInDate(date);
                          if (date >= checkOutDate) {
                            setCheckOutDate(new Date(date.getTime() + 86400000));
                          }
                          setShowCheckInPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.datePickerOptionText,
                          checkInDate.toDateString() === date.toDateString() && styles.datePickerOptionTextSelected
                        ]}>
                          {formatDateLong(date)}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                  <Pressable style={styles.datePickerClose} onPress={() => setShowCheckInPicker(false)}>
                    <Text style={styles.datePickerCloseText}>Cancel</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Modal>

            {/* Custom Date Picker Modal for Check-out */}
            <Modal
              visible={showCheckOutPicker}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowCheckOutPicker(false)}
            >
              <Pressable style={styles.datePickerOverlay} onPress={() => setShowCheckOutPicker(false)}>
                <View style={styles.datePickerContent}>
                  <Text style={styles.datePickerTitle}>Select Check-out Date</Text>
                  <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                    {generateDateOptions(new Date(checkInDate.getTime() + 86400000), 90).map((date) => (
                      <Pressable
                        key={date.toISOString()}
                        style={[
                          styles.datePickerOption,
                          checkOutDate.toDateString() === date.toDateString() && styles.datePickerOptionSelected
                        ]}
                        onPress={() => {
                          setCheckOutDate(date);
                          setShowCheckOutPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.datePickerOptionText,
                          checkOutDate.toDateString() === date.toDateString() && styles.datePickerOptionTextSelected
                        ]}>
                          {formatDateLong(date)}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                  <Pressable style={styles.datePickerClose} onPress={() => setShowCheckOutPicker(false)}>
                    <Text style={styles.datePickerCloseText}>Cancel</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Modal>

            {/* Guest Counter */}
            <View style={styles.guestSection}>
              <Text style={styles.sectionLabel}>Guests</Text>
              <View style={styles.guestCounter}>
                <Pressable 
                  style={[styles.counterButton, guests <= 1 && styles.counterButtonDisabled]}
                  onPress={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  <Ionicons name="remove" size={20} color={guests <= 1 ? "#D1D5DB" : "#2563EB"} />
                </Pressable>
                <Text style={styles.guestCount}>{guests}</Text>
                <Pressable 
                  style={[styles.counterButton, guests >= 10 && styles.counterButtonDisabled]}
                  onPress={() => setGuests(Math.min(10, guests + 1))}
                  disabled={guests >= 10}
                >
                  <Ionicons name="add" size={20} color={guests >= 10 ? "#D1D5DB" : "#2563EB"} />
                </Pressable>
              </View>
            </View>

            {/* Price Summary */}
            <View style={styles.priceSummary}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel2}>{destination.priceFormatted} × {nights} night{nights > 1 ? 's' : ''}</Text>
                <Text style={styles.priceValue}>₱{(destination.price * nights).toLocaleString()}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel2}>Service fee</Text>
                <Text style={styles.priceValue}>₱0</Text>
              </View>
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total</Text>
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
