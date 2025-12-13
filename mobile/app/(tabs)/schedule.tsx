import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Pressable, ActivityIndicator, RefreshControl, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooking } from "../../context/BookingContext";
import { useTheme } from "../../context/ThemeContext";
import { Booking, authApi } from "../../lib/api";
import { router, useFocusEffect } from "expo-router";

// Format date for display
const formatDateRange = (checkIn: string, checkOut: string): string => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return `${checkInDate.toLocaleDateString("en-US", options)} - ${checkOutDate.toLocaleDateString("en-US", options)}`;
};

// Calculate days between dates
const calculateDays = (checkIn: string, checkOut: string): string => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
};

export default function ScheduleScreen() {
  const { bookings, isLoading, fetchBookings, clearNewBookingFlag } = useBooking();
  const { colors, isDark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showTripModal, setShowTripModal] = useState(false);

  // Fetch bookings and favorites when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchBookings();
      clearNewBookingFlag();
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const data = await authApi.getFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to load favorites", error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  // Pull to refresh handler
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchBookings(), loadFavorites()]);
    setRefreshing(false);
  }, [fetchBookings]);

  // Get upcoming bookings (not cancelled or completed)
  const upcomingBookings = useMemo(() => {
    return bookings.filter((b) => b.status !== "cancelled" && b.status !== "completed");
  }, [bookings]);

  // Generate today's schedule from the nearest booking
  const todaySchedule = useMemo(() => {
    if (upcomingBookings.length === 0) return [];
    
    const nearestBooking = upcomingBookings[0];
    const checkInDate = new Date(nearestBooking.checkInDate);
    const today = new Date();
    
    // If check-in is today, show check-in schedule
    if (checkInDate.toDateString() === today.toDateString()) {
      return [
        { time: "09:00", activity: `Flight to ${nearestBooking.destinationName}`, type: "flight" },
        { time: "14:30", activity: "Hotel Check-in", type: "hotel" },
        { time: "16:00", activity: "City Tour", type: "activity" },
        { time: "19:30", activity: "Welcome Dinner", type: "dining" },
      ];
    }
    
    // Default schedule
    return [
      { time: "09:00", activity: `Explore ${nearestBooking.destinationName}`, type: "activity" },
      { time: "12:00", activity: "Lunch", type: "dining" },
      { time: "15:00", activity: "Sightseeing", type: "activity" },
      { time: "19:00", activity: "Dinner", type: "dining" },
    ];
  }, [upcomingBookings]);

  const renderTripCard = (booking: Booking) => (
    <Pressable 
      key={booking._id} 
      style={styles.tripCard}
      onPress={() => {
        setSelectedBooking(booking);
        setShowTripModal(true);
      }}
    >
      <ImageBackground
        source={booking.destinationImage ? { uri: booking.destinationImage } : require("../../assets/images/osaka.jpg")}
        style={styles.tripImage}
        imageStyle={{ borderRadius: 12 }}
        resizeMode="cover"
      >
        {/* Top overlay - Days badge */}
        <View style={styles.topOverlay}>
          <View style={styles.daysTag}>
            <Text style={styles.tripDays}>{calculateDays(booking.checkInDate, booking.checkOutDate)}</Text>
          </View>
        </View>

        {/* Bottom overlay - Trip info */}
        <View style={styles.bottomOverlay}>
          <Text style={styles.tripDestination}>{booking.destinationName}, {booking.destinationCountry}</Text>
          <Text style={styles.tripDates}>{formatDateRange(booking.checkInDate, booking.checkOutDate)}</Text>
          <View style={styles.tripFooter}>
            <Text style={styles.tripGuests}>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</Text>
            <View style={[styles.statusBadge, 
              booking.status === "confirmed" ? styles.confirmedBadge : styles.pendingBadge]}>
              <Text style={[styles.statusText,
                booking.status === "confirmed" ? styles.confirmedText : styles.pendingText]}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );

  const renderFavoriteCard = (destination: any) => (
    <Pressable 
      key={destination._id} 
      style={styles.favoriteCard}
      onPress={() => router.push(`/property-details?id=${destination._id}`)}
    >
      <ImageBackground
        source={{ uri: destination.imageUrl }}
        style={styles.favoriteImage}
        imageStyle={{ borderRadius: 12 }}
        resizeMode="cover"
      >
        <View style={styles.favoriteOverlay}>
          <View style={styles.favoriteHeart}>
            <Ionicons name="heart" size={16} color="#FF385C" />
          </View>
          <View style={styles.favoriteInfo}>
            <Text style={styles.favoriteName} numberOfLines={1}>{destination.name}</Text>
            <Text style={styles.favoriteCountry} numberOfLines={1}>{destination.country}</Text>
            <Text style={styles.favoritePrice}>₱{destination.price?.toLocaleString()}/night</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );

  const renderScheduleItem = (item: { time: string; activity: string; type: string }, index: number) => (
    <View key={index} style={[styles.scheduleItem, { borderBottomColor: colors.border }]}>
      <Text style={[styles.scheduleTime, { color: colors.textSecondary }]}>{item.time}</Text>
      <View style={styles.scheduleContent}>
        <Text style={[styles.scheduleActivity, { color: colors.text }]}>{item.activity}</Text>
        <Text style={[styles.scheduleType, { color: colors.textSecondary }]}>{item.type}</Text>
      </View>
    </View>
  );

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.text} />
          }
        >
          {/* Loading State */}
          {isLoading && !refreshing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading your trips...</Text>
            </View>
          )}

          {/* Upcoming Trips Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Trips</Text>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderTripCard)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="airplane-outline" size={48} color={colors.textSecondary} />
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No upcoming trips</Text>
                <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                  Start planning your next adventure by booking a destination!
                </Text>
              </View>
            )}
          </View>

          {/* Today's Schedule Section */}
          {todaySchedule.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Schedule</Text>
              <View style={[styles.scheduleCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.scheduleDate, { color: colors.textSecondary }]}>
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </Text>
                {todaySchedule.map(renderScheduleItem)}
              </View>
            </View>
          )}

          {/* Favorites Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Favorites</Text>
            {loadingFavorites ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : favorites.length > 0 ? (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.favoritesScroll}
              >
                {favorites.map(renderFavoriteCard)}
              </ScrollView>
            ) : (
              <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                <Ionicons name="heart-outline" size={48} color={colors.textSecondary} />
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No favorites yet</Text>
                <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                  Heart destinations you love to see them here!
                </Text>
              </View>
            )}
          </View>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </ImageBackground>

      {/* Trip Details Modal */}
      <Modal
        visible={showTripModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTripModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {selectedBooking && (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: colors.text }]}>Trip Details</Text>
                  <Pressable onPress={() => setShowTripModal(false)} style={styles.modalCloseButton}>
                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                  </Pressable>
                </View>

                {/* Destination Image */}
                <ImageBackground
                  source={selectedBooking.destinationImage ? { uri: selectedBooking.destinationImage } : require("../../assets/images/osaka.jpg")}
                  style={styles.modalImage}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View style={styles.modalImageOverlay}>
                    <Text style={styles.modalDestination}>{selectedBooking.destinationName}</Text>
                    <Text style={styles.modalCountry}>{selectedBooking.destinationCountry}</Text>
                  </View>
                </ImageBackground>

                {/* Flight Details */}
                <View style={styles.flightSection}>
                  <View style={styles.flightHeader}>
                    <Ionicons name="airplane" size={20} color="#2563EB" />
                    <Text style={[styles.flightTitle, { color: colors.text }]}>Flight Information</Text>
                  </View>
                  
                  <View style={[styles.flightCard, { backgroundColor: isDark ? colors.background : "#F3F4F6" }]}>
                    <View style={styles.flightRow}>
                      <View style={styles.flightPoint}>
                        <Text style={[styles.flightCode, { color: colors.text }]}>MNL</Text>
                        <Text style={[styles.flightCity, { color: colors.textSecondary }]}>Manila</Text>
                        <Text style={[styles.flightTime, { color: colors.text }]}>09:00 AM</Text>
                      </View>
                      <View style={styles.flightLine}>
                        <View style={[styles.flightDot, { backgroundColor: "#2563EB" }]} />
                        <View style={[styles.flightDash, { backgroundColor: "#2563EB" }]} />
                        <Ionicons name="airplane" size={16} color="#2563EB" />
                        <View style={[styles.flightDash, { backgroundColor: "#2563EB" }]} />
                        <View style={[styles.flightDot, { backgroundColor: "#2563EB" }]} />
                      </View>
                      <View style={styles.flightPoint}>
                        <Text style={[styles.flightCode, { color: colors.text }]}>{selectedBooking.destinationName.slice(0, 3).toUpperCase()}</Text>
                        <Text style={[styles.flightCity, { color: colors.textSecondary }]}>{selectedBooking.destinationName}</Text>
                        <Text style={[styles.flightTime, { color: colors.text }]}>
                          {new Date(selectedBooking.checkInDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Booking Details */}
                <View style={styles.detailsSection}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Check-in</Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {new Date(selectedBooking.checkInDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar" size={18} color={colors.textSecondary} />
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Check-out</Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {new Date(selectedBooking.checkOutDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="people-outline" size={18} color={colors.textSecondary} />
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Guests</Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>{selectedBooking.guests} guest{selectedBooking.guests > 1 ? 's' : ''}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="cash-outline" size={18} color={colors.textSecondary} />
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Total</Text>
                    <Text style={[styles.detailValue, { color: "#2563EB", fontWeight: "700" }]}>₱{selectedBooking.totalPrice?.toLocaleString()}</Text>
                  </View>
                </View>

                {/* Status Badge */}
                <View style={[styles.modalStatusBadge, selectedBooking.status === "confirmed" ? styles.confirmedBadge : styles.pendingBadge]}>
                  <Ionicons 
                    name={selectedBooking.status === "confirmed" ? "checkmark-circle" : "time"} 
                    size={18} 
                    color={selectedBooking.status === "confirmed" ? "#065F46" : "#92400E"} 
                  />
                  <Text style={[styles.modalStatusText, selectedBooking.status === "confirmed" ? styles.confirmedText : styles.pendingText]}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </Text>
                </View>

                {/* Close Button */}
                <Pressable 
                  style={styles.modalButton}
                  onPress={() => setShowTripModal(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
    paddingTop: 50,
  },
  section: {
    padding: 16,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#1F2937",
    marginBottom: 16 
  },
  // Loading State
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  // Trip Card
  tripCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  tripImage: {
    width: "100%",
    height: 200,
    justifyContent: "space-between",
  },
  topOverlay: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 12,
  },
  daysTag: {
    backgroundColor: "rgba(45, 55, 72, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tripDays: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "700",
  },
  bottomOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
    paddingTop: 12,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 12,
    opacity: 0.95,
  },
  tripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripGuests: {
    fontSize: 13,
    color: "#FFF",
    opacity: 0.9,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  confirmedBadge: {
    backgroundColor: "#D1FAE5",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  confirmedText: {
    color: "#065F46",
  },
  pendingText: {
    color: "#92400E",
  },
  // Schedule Card
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    paddingBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scheduleDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
    width: 60,
  },
  scheduleContent: {
    flex: 1,
    marginLeft: 12,
  },
  scheduleActivity: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
    marginBottom: 2,
  },
  scheduleType: {
    fontSize: 12,
    color: "#6B7280",
    textTransform: "capitalize",
  },
  bottomSpacing: {
    height: 100,
  },
  // Favorites Section
  favoritesScroll: {
    marginLeft: -4,
    paddingLeft: 4,
    paddingRight: 16,
    paddingBottom: 32,
  },
  favoriteCard: {
    width: 160,
    height: 200,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  favoriteImage: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  favoriteOverlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  favoriteHeart: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 6,
  },
  favoriteInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    padding: 8,
  },
  favoriteName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
  favoriteCountry: {
    fontSize: 12,
    color: "#FFF",
    opacity: 0.8,
    marginBottom: 4,
  },
  favoritePrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
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
    padding: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalImage: {
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: "flex-end",
  },
  modalImageOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  modalDestination: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
  modalCountry: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
  },
  flightSection: {
    marginBottom: 16,
  },
  flightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  flightTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  flightCard: {
    borderRadius: 12,
    padding: 16,
  },
  flightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flightPoint: {
    alignItems: "center",
    width: 80,
  },
  flightCode: {
    fontSize: 18,
    fontWeight: "700",
  },
  flightCity: {
    fontSize: 12,
    marginTop: 2,
  },
  flightTime: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  flightLine: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  flightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  flightDash: {
    flex: 1,
    height: 2,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  detailLabel: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalStatusText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  modalButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
