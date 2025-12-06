import React from "react";
import { ImageBackground, StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function GetStartedScreen() {
  const { colors, isDark } = useTheme();

  return (
    <ImageBackground
      source={require("../../assets/images/skyblue.jpg")}
      style={[styles.bg, { backgroundColor: colors.background }]}
      resizeMode="cover"
      imageStyle={{ opacity: isDark ? 0.3 : 1 }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/travelpolaroids.png")}
            style={styles.polaroidImage}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.contentContainer, { backgroundColor: isDark ? "rgba(31, 41, 55, 0.95)" : "rgba(255,255,255,0.95)" }]}>
          <Text style={[styles.title, { color: colors.text }]}>Turn Your Travel Dreams Into Reality</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Find the perfect getaway from thousands of destinations around the world
          </Text>

          <Link href="/(auth)/login" asChild>
            <Pressable style={[styles.button, { backgroundColor: colors.primary }]}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
  },
  container: { 
    flex: 1, 
    justifyContent: "space-between", 
    paddingVertical: 60,
    paddingHorizontal: 24 
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  polaroidImage: {
    width: 280,
    height: 320,
    marginBottom: 20,
  },
  contentContainer: {
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    gap: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    elevation: 2,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});