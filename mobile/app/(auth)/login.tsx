import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      await signIn(email.trim(), password);
      router.replace("/(tabs)");
    } catch (e: any) {
      const errorMessage = e?.message || "Please check your credentials and try again.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/skyblue.jpg")}
      style={[styles.bg, { backgroundColor: colors.background }]}
      resizeMode="cover"
      imageStyle={{ opacity: isDark ? 0.3 : 1 }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <Image 
          source={require("../../assets/figma/voyago_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[
                styles.input, 
                { color: colors.text, borderColor: errors.email ? colors.error : colors.border, backgroundColor: colors.background }
              ]}
            />
            {errors.email && <Text style={[styles.errorText, { color: colors.error }]}>{errors.email}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <View style={[
              styles.passwordContainer, 
              { borderColor: errors.password ? colors.error : colors.border, backgroundColor: colors.background }
            ]}>
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                }}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPassword}
                style={[styles.passwordInput, { color: colors.text }]}
              />
              <Pressable 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={22} 
                  color={colors.textSecondary} 
                />
              </Pressable>
            </View>
            {errors.password && <Text style={[styles.errorText, { color: colors.error }]}>{errors.password}</Text>}
          </View>
          <Pressable style={[styles.button, { backgroundColor: colors.primary }, loading && { opacity: 0.6 }]} disabled={loading} onPress={onSubmit}>
            <Text style={styles.buttonText}>{loading ? "Signing in..." : "Login"}</Text>
          </Pressable>
          <View style={styles.footerRow}>
            <Text style={{ color: colors.text }}>New here? </Text>
            <Link href={"/(auth)/register" as any} style={[styles.link, { color: colors.primary }]}>Create an account</Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  logo: { width: 350, height: 120, alignSelf: "center", marginBottom: 32 },
  card: { borderRadius: 12, padding: 20, gap: 12, elevation: 0 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  inputContainer: { marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: { padding: 14, borderRadius: 8, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#fff", fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  link: { fontWeight: "600" },
});
