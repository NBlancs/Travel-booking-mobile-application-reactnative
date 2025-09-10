import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const onSignOut = () => {
    signOut();
    router.replace("/(auth)/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Signed in as {user?.email}</Text>
      <Pressable style={styles.button} onPress={onSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555" },
  button: { marginTop: 16, backgroundColor: "#DC2626", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
});
