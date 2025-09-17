import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from "react-native";

const upcomingTrips = [
  {
    id: 1,
    destination: "Santorini, Greece",
    image: require("../../assets/images/santorini.png"),
    dates: "Mar 15 - Mar 22, 2025",
    status: "Confirmed",
    days: "7 days"
  },
  {
    id: 2,
    destination: "Kyoto, Japan",
    image: require("../../assets/images/kyoto.png"),
    dates: "Apr 10 - Apr 17, 2025",
    status: "Pending",
    days: "8 days"
  }
];

const todaySchedule = [
  { time: "09:00", activity: "Flight to Santorini", type: "flight" },
  { time: "14:30", activity: "Hotel Check-in", type: "hotel" },
  { time: "16:00", activity: "Sunset Tour", type: "activity" },
  { time: "19:30", activity: "Dinner Reservation", type: "dining" }
];

export default function ScheduleScreen() {
  const renderTripCard = (trip: typeof upcomingTrips[0]) => (
    <View key={trip.id} style={styles.tripCard}>
      <Image source={trip.image} style={styles.tripImage} resizeMode="cover" />
      <View style={styles.tripContent}>
        <Text style={styles.tripDestination}>{trip.destination}</Text>
        <Text style={styles.tripDates}>{trip.dates}</Text>
        <View style={styles.tripFooter}>
          <Text style={styles.tripDays}>{trip.days}</Text>
          <View style={[styles.statusBadge, 
            trip.status === "Confirmed" ? styles.confirmedBadge : styles.pendingBadge]}>
            <Text style={[styles.statusText,
              trip.status === "Confirmed" ? styles.confirmedText : styles.pendingText]}>
              {trip.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderScheduleItem = (item: typeof todaySchedule[0], index: number) => (
    <View key={index} style={styles.scheduleItem}>
      <Text style={styles.scheduleTime}>{item.time}</Text>
      <View style={styles.scheduleContent}>
        <Text style={styles.scheduleActivity}>{item.activity}</Text>
        <Text style={styles.scheduleType}>{item.type}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Trips</Text>
        {upcomingTrips.map(renderTripCard)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleDate}>March 15, 2025</Text>
          {todaySchedule.map(renderScheduleItem)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB" 
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
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripImage: {
    width: "100%",
    height: 120,
  },
  tripContent: {
    padding: 16,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  tripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripDays: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
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
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
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
});
