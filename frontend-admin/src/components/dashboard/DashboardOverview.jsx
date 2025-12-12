import { useAdminReviews } from "../../hooks/useAdminReviews";

function DashboardOverview() {
  // Use the same hook as the Reviews page so data always comes from the backend
  const { reviews, loading } = useAdminReviews();

  const totalReviews = reviews.length;
  const averageRating = (() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    return +(sum / reviews.length).toFixed(1);
  })();

  // Simple rating distribution (1-5 stars)
  const ratingBuckets = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: reviews.filter((r) => Number(r.rating) === star).length,
  }));
  const maxBucket = Math.max(1, ...ratingBuckets.map((b) => b.count));

  const latestReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Dashboard overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            High-level summary of traveller feedback and quick access to main
            admin sections.
          </p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Total reviews
          </p>
          <p className="text-2xl font-semibold text-slate-900">{totalReviews}</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Count of traveller reviews submitted from the user website.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Average rating
          </p>
          <p className="text-2xl font-semibold text-slate-900">{averageRating}/5</p>
          <div className="mt-1 flex items-center gap-1 text-xs">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={
                  index < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-slate-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Based on all reviews.</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Sections summary
          </p>
          <ul className="space-y-1 text-[11px] text-slate-600">
            <li>Destination: manage tourist places.</li>
            <li>Gallery: upload vehicle photos.</li>
            <li>Contact: update address & bank details.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Reviews quick info
          </p>
          <p className="text-sm font-semibold text-slate-900 mb-1">
            Latest: {latestReviews[0]?.date || "No reviews yet"}
          </p>
          <p className="text-[11px] text-slate-500">
            Recent feedback appears below. Use the Review tab to manage all
            entries.
          </p>
        </div>
      </div>

      {/* Rating distribution + latest reviews */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Rating distribution
          </h3>
          {totalReviews === 0 ? (
            <p className="text-xs text-slate-500">
              No reviews available yet. Once users submit reviews, you will see a
              breakdown here.
            </p>
          ) : (
            <div className="space-y-2">
              {ratingBuckets.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-10 text-right text-slate-600">
                    {star}★
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${(count / maxBucket) * 100 || 0}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-slate-500">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Latest reviews
          </h3>
          {loading ? (
            <p className="text-xs text-slate-500">Loading latest reviews...</p>
          ) : latestReviews.length === 0 ? (
            <p className="text-xs text-slate-500">
              No reviews yet. Once users submit reviews, the 3 most recent will
              show here.
            </p>
          ) : (
            <div className="space-y-3">
              {latestReviews.map((review) => (
                <div key={review._id || review.id} className="border border-slate-100 rounded-xl p-3 bg-slate-50/60">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {review.name}
                      </p>
                      {review.trip && (
                        <p className="text-[11px] text-sky-700 truncate mt-0.5">
                          {review.trip}
                        </p>
                      )}
                    </div>
                    {review.date && (
                      <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                        {review.date}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] mt-1 mb-1">
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
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-3 whitespace-pre-line">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick shortcuts */}
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 sm:p-5 flex flex-col gap-3 text-xs sm:text-sm text-slate-600">
        <h3 className="text-sm font-semibold text-slate-900">Quick shortcuts</h3>
        <p className="text-[11px] sm:text-xs text-slate-500">
          Use the left sidebar to open each section. This overview is read-only;
          all editing happens inside the destination, gallery, contact and review
          screens.
        </p>
        <ul className="space-y-2 text-[11px] sm:text-xs">
          <li>
            <span className="font-medium text-slate-800">Destination:</span> add
            or update tourist places displayed to users.
          </li>
          <li>
            <span className="font-medium text-slate-800">Gallery:</span> manage
            vehicle photos that appear in the Gallery page.
          </li>
          <li>
            <span className="font-medium text-slate-800">Contact:</span> set
            address, phone numbers, emails, bank account and UPI QR.
          </li>
          <li>
            <span className="font-medium text-slate-800">Review:</span> view and
            delete traveller reviews submitted from the user site.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardOverview;
