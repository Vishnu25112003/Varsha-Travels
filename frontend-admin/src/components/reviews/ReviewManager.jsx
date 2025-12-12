import { useState } from "react";
import { useAdminReviews } from "../../hooks/useAdminReviews";
import ConfirmDialog from "../common/ConfirmDialog.jsx";
import { useNotification } from "../../hooks/useNotificationPopup.jsx";

function ReviewManager() {
  const { reviews, deleteReview } = useAdminReviews();
  const { showNotification } = useNotification();
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleDelete = (review) => {
    setPendingDelete(review);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteReview(pendingDelete);
      showNotification({
        type: "success",
        title: "Review deleted",
        message: `Review from "${pendingDelete.name}" has been removed.`,
      });
    } catch (error) {
      console.error(error);
      showNotification({
        type: "error",
        title: "Failed to delete review",
        message: "Something went wrong while deleting the review.",
      });
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Traveller reviews</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            All reviews submitted from the user website are listed here. You can
            read details and delete any review if needed.
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-4 text-sm text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
          No reviews available yet. Ask users to submit reviews from the Reviews
          page on the website.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Desktop / tablet: list with columns */}
          <div className="hidden md:block max-h-[540px] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Trip</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Review</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review._id || review.id}
                    className="border-t border-slate-100 align-top hover:bg-slate-50/70"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 max-w-[160px] truncate">
                      {review.name}
                    </td>
                    <td className="px-4 py-3 text-slate-700 max-w-[180px] truncate">
                      {review.trip || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={
                              index < (review.rating || 0)
                                ? "text-yellow-400"
                                : "text-slate-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-1 text-[11px] text-slate-500">
                          ({review.rating || 0}/5)
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {review.date || "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-700 text-xs max-w-[260px]">
                      <p className="line-clamp-3 whitespace-pre-line">
                        {review.content}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(review)}
                        className="inline-flex items-center rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <div className="md:hidden max-h-[520px] overflow-y-auto divide-y divide-slate-100">
            {reviews.map((review) => (
              <div key={review._id || review.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {review.name}
                    </p>
                    {review.trip && (
                      <p className="text-xs text-sky-700 mt-0.5 truncate">
                        {review.trip}
                      </p>
                    )}
                    {review.date && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {review.date}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(review)}
                    className="inline-flex items-center rounded-lg border border-red-200 px-2 py-1 text-[11px] font-medium text-red-600 bg-white"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < (review.rating || 0)
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-1 text-[11px] text-slate-500">
                    ({review.rating || 0}/5)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete review"
        message={
          pendingDelete
            ? `Are you sure you want to delete the review from "${pendingDelete.name}" about "${pendingDelete.trip || "Trip"}"?`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default ReviewManager;
