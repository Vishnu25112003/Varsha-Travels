import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "varsha_travels_reviews";

const defaultReviews = [
  {
    id: 1,
    name: "Priya from Chennai",
    rating: 5,
    trip: "Family trip to Ooty & Kodaikanal",
    content:
      "Very safe and comfortable journey. Driver was polite and knew all the best viewpoints. Perfect for family trips!",
    mediaUrl:
      "https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?w=800&h=500&fit=crop",
    date: "Jan 2024",
  },
  {
    id: 2,
    name: "Rahul & Friends",
    rating: 4,
    trip: "Weekend trip to Kodaikanal",
    content:
      "Clean vehicle, on-time pickup and flexible timing. We stopped at multiple photo spots on the way.",
    mediaUrl:
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=500&fit=crop",
    date: "Dec 2023",
  },
  {
    id: 3,
    name: "Corporate Team",
    rating: 5,
    trip: "2-day corporate outing",
    content:
      "Well organized, comfortable tempo traveller and smooth coordination. Highly recommended for group travel.",
    mediaUrl:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479a?w=800&h=500&fit=crop",
    date: "Nov 2023",
  },
];

export function useReviews() {
  const [reviews, setReviews] = useState(defaultReviews);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load reviews from storage", error);
    }
  }, []);

  // Persist whenever reviews change
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Failed to save reviews to storage", error);
    }
  }, [reviews]);

  const addReview = (review) => {
    setReviews((prev) => [
      {
        id: Date.now(),
        ...review,
      },
      ...prev,
    ]);
  };

  const sortedReviews = useMemo(
    () => [...reviews].sort((a, b) => (b.id || 0) - (a.id || 0)),
    [reviews]
  );

  return { reviews: sortedReviews, addReview };
}
