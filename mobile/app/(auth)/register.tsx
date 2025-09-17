import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ImageBackground } from "expo-image";

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
  await signUp(email, password);
  router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Registration failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/skyblue.jpg")}
      style={styles.bg}
      resizeMode="cover"
    > 



    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <Pressable style={[styles.button, loading && { opacity: 0.6 }]} disabled={loading} onPress={onSubmit}>
          <Text style={styles.buttonText}>{loading ? "Creating..." : "Register"}</Text>
        </Pressable>
        <View style={styles.footerRow}>
          <Text>Already have an account? </Text>
          <Link href={"/(auth)/login" as any} style={styles.link}>Login</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
    </ImageBackground> 
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "transparent" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 20, gap: 12, elevation: 2 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12 },
  button: { backgroundColor: "#16A34A", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#fff", fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  link: { color: "#2563EB", fontWeight: "600" },
});
