function BookingDetails({ booking, onStatusChange, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      {/* Header with Back Button (Mobile) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
            aria-label="Back to list"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              Booking Details
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
              ID: {booking._id.slice(-8)}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hidden lg:block text-slate-400 hover:text-slate-600 transition"
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Status Selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-700 mb-2">
          Booking Status
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
          {["pending", "confirmed", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(booking._id, status)}
              className={`px-2 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition ${
                booking.status === status
                  ? `${getStatusColor(status)} text-white shadow-md`
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Customer Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-slate-400 shrink-0">👤</span>
              <div>
                <p className="font-medium text-slate-900">{booking.fullName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-400 shrink-0">📧</span>
              <a
                href={`mailto:${booking.email}`}
                className="text-sky-600 hover:text-sky-700 break-all"
              >
                {booking.email}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-400 shrink-0">📞</span>
              <a
                href={`tel:${booking.phone}`}
                className="text-sky-600 hover:text-sky-700"
              >
                {booking.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Trip Details
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Destination</p>
              <p className="font-medium text-slate-900">{booking.destination}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Vehicle</p>
              <p className="font-medium text-slate-900">{booking.vehicle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-slate-500 text-xs mb-1">Pickup Date</p>
                <p className="font-medium text-slate-900 text-xs">
                  {formatDate(booking.pickupDate)}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">Dropoff Date</p>
                <p className="font-medium text-slate-900 text-xs">
                  {formatDate(booking.dropoffDate)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Passengers</p>
              <p className="font-medium text-slate-900">{booking.passengers}</p>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Special Requests
            </h4>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 whitespace-pre-wrap">
              {booking.specialRequests}
            </p>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Booking Information
          </h4>
          <div className="space-y-1 text-xs text-slate-500">
            <p>Created: {formatDateTime(booking.createdAt)}</p>
            <p>Last Updated: {formatDateTime(booking.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
