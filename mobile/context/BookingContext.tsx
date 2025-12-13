import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { bookingsApi, Booking, settingsStorage, UpdateBookingData } from "../lib/api";

interface BookingContextValue {
  bookings: Booking[];
  hasNewBooking: boolean;
  isLoading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, data: UpdateBookingData) => Promise<Booking>;
  cancelBooking: (id: string) => Promise<Booking>;
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

  // Update an existing booking
  const updateBooking = useCallback(async (id: string, data: UpdateBookingData): Promise<Booking> => {
    try {
      const response = await bookingsApi.update(id, data);
      // Update local state with the updated booking
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? response.booking : b))
      );
      return response.booking;
    } catch (err: any) {
      setError(err.message || "Failed to update booking");
      throw err;
    }
  }, []);

  // Cancel a booking
  const cancelBooking = useCallback(async (id: string): Promise<Booking> => {
    try {
      const response = await bookingsApi.cancel(id);
      // Update local state with the cancelled booking
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? response.booking : b))
      );
      return response.booking;
    } catch (err: any) {
      setError(err.message || "Failed to cancel booking");
      throw err;
    }
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
      updateBooking,
      cancelBooking,
      clearNewBookingFlag,
      refreshBookings,
    }),
    [bookings, hasNewBooking, isLoading, error, fetchBookings, addBooking, updateBooking, cancelBooking, clearNewBookingFlag, refreshBookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
};
