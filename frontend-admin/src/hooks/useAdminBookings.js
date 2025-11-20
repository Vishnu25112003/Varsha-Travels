import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "varsha_travels_bookings";

export function useAdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookings(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load bookings from storage", error);
    }
  }, []);

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [bookings],
  );

  return { bookings: sortedBookings };
}
