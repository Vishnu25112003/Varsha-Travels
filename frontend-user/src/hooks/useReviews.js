import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = "https://varsha-travels.onrender.com"; // backend for reviews

// No default hardcoded reviews here; we rely on backend /api/reviews.
const defaultReviews = [];

export function useReviews() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [loading, setLoading] = useState(true);

  // Load from backend on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/reviews`);
        if (!res.ok) {
          throw new Error("Failed to load reviews");
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
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

  const addReview = async (review) => {
    // Optimistic: update UI immediately, then try to sync with backend
    const tempId = Date.now();
    const optimistic = { id: tempId, ...review };
    setReviews((prev) => [optimistic, ...prev]);

    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        throw new Error("Failed to create review");
      }

      const created = await res.json();
      // Replace optimistic review with real one from backend
      setReviews((prev) => [
        created,
        ...prev.filter((r) => r.id !== tempId && r._id !== created._id),
      ]);
    } catch (error) {
      console.error("Failed to save review to backend", error);
      // Optionally, revert optimistic change or keep it only locally
    }
  };

  const sortedReviews = useMemo(
    () =>
      [...reviews].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : a.id || 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : b.id || 0;
        return bTime - aTime;
      }),
    [reviews]
  );

  return { reviews: sortedReviews, addReview, loading };
}
