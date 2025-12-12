import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../hooks/useReviews";

export default function Reviews() {
  const { reviews, addReview } = useReviews();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    trip: "",
    rating: 5,
    content: "",
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) return;

    setSubmitting(true);

    const baseReview = {
      name: formData.name.trim(),
      trip: formData.trip.trim(),
      rating: Number(formData.rating) || 5,
      content: formData.content.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
    };

    // If no file, save directly
    if (!mediaFile) {
      try {
        await addReview(baseReview);
      } catch (err) {
        console.error("Failed to add review", err);
      }
      setFormData({ name: "", trip: "", rating: 5, content: "" });
      setSubmitting(false);
      navigate("/");
      return;
    }

    // If a file is selected, convert to Data URL so it can be stored and displayed
    const file = mediaFile;
    const reader = new FileReader();
    reader.onload = async () => {
      const mediaUrl = reader.result;
      const mediaType = file.type.startsWith("video/") ? "video" : "image";
      try {
        await addReview({ ...baseReview, mediaUrl, mediaType });
      } catch (err) {
        console.error("Failed to add review with media", err);
      }

      setFormData({ name: "", trip: "", rating: 5, content: "" });
      setMediaFile(null);
      setSubmitting(false);
      navigate("/");
    };
    reader.onerror = () => {
      console.error("Failed to read media file");
      setSubmitting(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
        {/* Reviews list */}
        <section>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Traveller Reviews
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Read what our guests say about travelling with Varsha Travels.
          </p>

          {reviews.length === 0 ? (
            <div className="border border-dashed border-blue-500/40 rounded-2xl p-8 text-center bg-blue-50/40">
              <p className="text-gray-700 mb-3 font-medium">
                No reviews yet.
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Be the first to share your experience with us.
              </p>
              <button
                type="button"
                onClick={() => {
                  const formSection = document.getElementById("add-review-form");
                  if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold shadow hover:shadow-lg hover:shadow-blue-600/40 transition-transform hover:scale-105"
              >
                Add your review
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="border border-blue-600/15 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-white to-slate-50 flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  {review.mediaUrl && (
                    <div className="w-full sm:w-40 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                      {review.mediaType === "video" ? (
                        <video
                          src={review.mediaUrl}
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                        />
                      ) : (
                        <img
                          src={review.mediaUrl}
                          alt={review.trip || review.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h2 className="font-semibold text-gray-900 truncate max-w-[70%]">
                        {review.name}
                      </h2>
                      {review.date && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {review.date}
                        </span>
                      )}
                    </div>
                    {review.trip && (
                      <p className="text-xs sm:text-sm text-blue-700 mb-1">
                        {review.trip}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={
                            index < (review.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {review.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Add review form */}
        <section
          id="add-review-form"
          className="bg-gradient-to-br from-white to-blue-50 border border-blue-600/20 rounded-3xl p-6 sm:p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your review</h2>
          <p className="text-gray-600 text-sm mb-6">
            Share your experience, rate our service and optionally attach an image or
            video URL from your trip.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Eg. Priya from Chennai"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-blue-600/30 bg-white text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Trip / Destination (optional)
              </label>
              <input
                type="text"
                name="trip"
                value={formData.trip}
                onChange={handleChange}
                placeholder="Eg. 3 days Ooty & Kodaikanal family trip"
                className="w-full px-3.5 py-2.5 rounded-lg border border-blue-600/30 bg-white text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Star rating
              </label>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1;
                  const active = value <= (formData.rating || 0);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRatingChange(value)}
                      className="focus:outline-none"
                    >
                      <span
                        className={
                          active
                            ? "text-2xl text-yellow-400 drop-shadow-sm"
                            : "text-2xl text-gray-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  );
                })}
                <span className="ml-2 text-xs text-gray-500">
                  {formData.rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Your review
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Share about safety, comfort, driver behaviour, timing, etc."
                rows={4}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-blue-600/30 bg-white text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Upload image / video (optional)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  setMediaFile(file || null);
                }}
                className="block w-full text-sm text-gray-900 file:mr-3 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              <p className="mt-1 text-xs text-gray-500">
                Choose a photo or video from your device. It will be stored only in this browser.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-blue-600/40 transition-transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Post review"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
