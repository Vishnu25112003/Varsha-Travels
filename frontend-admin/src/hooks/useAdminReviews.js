import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = "http://localhost:5000"; // backend for reviews

// Same default reviews as frontend-user (for first load)

export function useAdminReviews() {
  // Start with no reviews; load everything from the backend so data is always real-time
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from backend once on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/reviews`);
        if (!res.ok) {
          throw new Error("Failed to load reviews");
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setReviews(data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const deleteReview = async (reviewIdOrDoc) => {
    const id = reviewIdOrDoc?._id || reviewIdOrDoc?.id || reviewIdOrDoc;
    if (!id) return;

    // Optimistically remove from UI first
    setReviews((prev) => prev.filter((r) => r._id !== id && r.id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error("Failed to delete review in backend", error);
    }
  };

  const sortedReviews = useMemo(
    () =>
      [...reviews].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : a.id || 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : b.id || 0;
        return bTime - aTime;
      }),
    [reviews],
  );

  return { reviews: sortedReviews, deleteReview, loading };
}
