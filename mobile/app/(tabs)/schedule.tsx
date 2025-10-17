import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const upcomingTrips = [
  {
    id: 1,
    destination: "Osaka, Japan",
    image: require("../../assets/images/osaka.jpg"),
    dates: "Mar 15 - Mar 22, 2025",
    status: "Confirmed",
    days: "7 days"
  },
  {
    id: 2,
    destination: "Kuala Lumpur, Malaysia",
    image: require("../../assets/images/kuala_lumpur.jpg"),
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
      <ImageBackground
        source={trip.image}
        style={styles.tripImage}
        imageStyle={{ borderRadius: 12 }}
        resizeMode="cover"
      >
        {/* Top overlay - Days badge */}
        <View style={styles.topOverlay}>
          <View style={styles.daysTag}>
            <Text style={styles.tripDays}>{trip.days}</Text>
          </View>
        </View>

        {/* Bottom overlay - Trip info */}
        <View style={styles.bottomOverlay}>
          <Text style={styles.tripDestination}>{trip.destination}</Text>
          <Text style={styles.tripDates}>{trip.dates}</Text>
          <View style={styles.tripFooter}>
            <View style={[styles.statusBadge, 
              trip.status === "Confirmed" ? styles.confirmedBadge : styles.pendingBadge]}>
              <Text style={[styles.statusText,
                trip.status === "Confirmed" ? styles.confirmedText : styles.pendingText]}>
                {trip.status}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/skyblue.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 0.25 }}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Upcoming Trips</Text> */}
            {upcomingTrips.map(renderTripCard)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <View style={styles.scheduleCard}>
              <Text style={styles.scheduleDate}>March 15, 2025</Text>
              {todaySchedule.map(renderScheduleItem)}
            </View>
          </View>

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
    backdropFilter: "blur(10px)",
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
    backdropFilter: "blur(10px)",
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
    justifyContent: "flex-end",
    alignItems: "center",
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
