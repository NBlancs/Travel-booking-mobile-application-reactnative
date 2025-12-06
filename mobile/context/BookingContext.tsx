import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { bookingsApi, Booking, settingsStorage } from "../lib/api";

interface BookingContextValue {
  bookings: Booking[];
  hasNewBooking: boolean;
  isLoading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Booking) => void;
  clearNewBookingFlag: () => void;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const NEW_BOOKING_KEY = "hasNewBooking";

export const BookingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hasNewBooking, setHasNewBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial state from storage
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedFlag = await settingsStorage.get<boolean>(NEW_BOOKING_KEY, false);
        setHasNewBooking(savedFlag);
      } catch (err) {
        console.log("Error loading booking state:", err);
      }
    };
    loadState();
  }, []);

  // Fetch all bookings from API
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingsApi.getAll();
      setBookings(response.bookings);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
      console.log("Error fetching bookings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a new booking to the list
  const addBooking = useCallback(async (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
    setHasNewBooking(true);
    // Persist the flag
    await settingsStorage.set(NEW_BOOKING_KEY, true);
  }, []);

  // Clear the new booking notification flag
  const clearNewBookingFlag = useCallback(async () => {
    setHasNewBooking(false);
    await settingsStorage.set(NEW_BOOKING_KEY, false);
  }, []);

  // Refresh bookings (alias for fetchBookings)
  const refreshBookings = useCallback(async () => {
    await fetchBookings();
  }, [fetchBookings]);

  const value = useMemo(
    () => ({
      bookings,
      hasNewBooking,
      isLoading,
      error,
      fetchBookings,
      addBooking,
      clearNewBookingFlag,
      refreshBookings,
    }),
    [bookings, hasNewBooking, isLoading, error, fetchBookings, addBooking, clearNewBookingFlag, refreshBookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
};
