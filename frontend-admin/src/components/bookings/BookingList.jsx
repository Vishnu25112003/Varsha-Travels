function BookingList({ bookings, onSelect, onDelete, selectedId }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-300";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className={`bg-white rounded-xl border-2 p-4 transition cursor-pointer hover:shadow-md ${
            selectedId === booking._id
              ? "border-sky-500 shadow-md"
              : "border-slate-200"
          }`}
          onClick={() => onSelect(booking)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-slate-900 truncate">
                  {booking.fullName}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <span className="text-slate-400">📍</span>
                  <span className="truncate">{booking.destination}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-slate-400">🚗</span>
                  <span className="truncate">{booking.vehicle}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-slate-400">📅</span>
                  <span>
                    {formatDate(booking.pickupDate)} →{" "}
                    {formatDate(booking.dropoffDate)}
                  </span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-slate-400">👥</span>
                  <span>{booking.passengers} passenger(s)</span>
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(booking);
              }}
              className="text-red-500 hover:text-red-700 transition p-1"
              aria-label="Delete booking"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>📧 {booking.email}</span>
            <span>📞 {booking.phone}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;
