import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { BookingProvider } from "../context/BookingContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
