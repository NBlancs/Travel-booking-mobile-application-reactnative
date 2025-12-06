import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooking } from "../../context/BookingContext";
import { destinations, Destination } from "../../data/destinations";
import { Booking } from "../../lib/api";

// Get destination image by destinationId
const getDestinationImage = (destinationId: number): any => {
  const destination = destinations.find((d) => d.id === destinationId);
  return destination?.image || require("../../assets/images/osaka.jpg");
};

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
  const [refreshing, setRefreshing] = React.useState(false);

  // Fetch bookings on mount and clear notification
  useEffect(() => {
    fetchBookings();
    clearNewBookingFlag();
  }, []);

  // Pull to refresh handler
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchBookings();
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
    <View key={booking._id} style={styles.tripCard}>
      <ImageBackground
        source={getDestinationImage(booking.destinationId)}
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
    </View>
  );

  const renderScheduleItem = (item: { time: string; activity: string; type: string }, index: number) => (
    <View key={index} style={styles.scheduleItem}>
      <Text style={styles.scheduleTime}>{item.time}</Text>
      <View style={styles.scheduleContent}>
        <Text style={styles.scheduleActivity}>{item.activity}</Text>
        <Text style={styles.scheduleType}>{item.type}</Text>
      </View>
    </View>
  );

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Loading State */}
          {isLoading && !refreshing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.loadingText}>Loading your trips...</Text>
            </View>
          )}

          {/* Upcoming Trips Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Trips</Text>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderTripCard)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="airplane-outline" size={48} color="#9CA3AF" />
                <Text style={styles.emptyStateTitle}>No upcoming trips</Text>
                <Text style={styles.emptyStateText}>
                  Start planning your next adventure by booking a destination!
                </Text>
              </View>
            )}
          </View>

          {/* Today's Schedule Section */}
          {todaySchedule.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
              <View style={styles.scheduleCard}>
                <Text style={styles.scheduleDate}>
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </Text>
                {todaySchedule.map(renderScheduleItem)}
              </View>
            </View>
          )}

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
});
