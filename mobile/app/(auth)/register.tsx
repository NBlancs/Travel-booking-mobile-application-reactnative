import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { ImageBackground } from "expo-image";
import { useTheme } from "../../context/ThemeContext";

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; username?: string; password?: string; confirmPassword?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; username?: string; password?: string; confirmPassword?: string } = {};
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (username.length > 30) {
      newErrors.username = "Username cannot exceed 30 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    
    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await signUp(email.trim(), username.trim(), password);
      Alert.alert(
        "Welcome!",
        "Your account has been created successfully.",
        [{ text: "Let's Go!", onPress: () => router.replace("/(tabs)") }]
      );
    } catch (e: any) {
      const errorMessage = e?.message || "Registration failed. Please try again.";
      Alert.alert("Registration Failed", errorMessage);
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
        <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
        
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
          <TextInput
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
            }}
            placeholder="Username"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            style={[
              styles.input, 
              { color: colors.text, borderColor: errors.username ? colors.error : colors.border, backgroundColor: colors.background }
            ]}
          />
          {errors.username && <Text style={[styles.errorText, { color: colors.error }]}>{errors.username}</Text>}
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

        <View style={styles.inputContainer}>
          <View style={[
            styles.passwordContainer, 
            { borderColor: errors.confirmPassword ? colors.error : colors.border, backgroundColor: colors.background }
          ]}>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Confirm Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showConfirmPassword}
              style={[styles.passwordInput, { color: colors.text }]}
            />
            <Pressable 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color={colors.textSecondary} 
              />
            </Pressable>
          </View>
          {errors.confirmPassword && <Text style={[styles.errorText, { color: colors.error }]}>{errors.confirmPassword}</Text>}
        </View>

        <Pressable style={[styles.button, loading && { opacity: 0.6 }]} disabled={loading} onPress={onSubmit}>
          <Text style={styles.buttonText}>{loading ? "Creating account..." : "Register"}</Text>
        </Pressable>
        <View style={styles.footerRow}>
          <Text style={{ color: colors.text }}>Already have an account? </Text>
          <Link href={"/(auth)/login" as any} style={[styles.link, { color: colors.primary }]}>Login</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
    </ImageBackground> 
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "transparent" },
  logo: { width: 350, height: 120, alignSelf: "center", marginBottom: 32 },
  card: { borderRadius: 12, padding: 20, gap: 8, elevation: 0 },
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
  button: { backgroundColor: "#16A34A", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  link: { fontWeight: "600" },
});
