function MessageDetails({ message, onStatusChange, onStarToggle, onClose }) {
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-500";
      case "read":
        return "bg-slate-500";
      case "replied":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      {/* Header with Back Button (Mobile) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <button
            onClick={onClose}
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition shrink-0"
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
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                {message.name}
              </h3>
              <button
                onClick={() => onStarToggle(message._id, !message.isStarred)}
                className="text-lg sm:text-xl hover:scale-110 transition shrink-0"
              >
                {message.isStarred ? "⭐" : "☆"}
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
              ID: {message._id.slice(-8)}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hidden lg:block text-slate-400 hover:text-slate-600 transition shrink-0"
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
          Message Status
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["unread", "read", "replied"].map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(message._id, status)}
              className={`px-2 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition ${
                message.status === status
                  ? `${getStatusColor(status)} text-white shadow-md`
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Contact Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-slate-400 shrink-0">📧</span>
              <a
                href={`mailto:${message.email}`}
                className="text-sky-600 hover:text-sky-700 break-all"
              >
                {message.email}
              </a>
            </div>
            {message.phone && (
              <div className="flex items-start gap-2">
                <span className="text-slate-400 shrink-0">📞</span>
                <a
                  href={`tel:${message.phone}`}
                  className="text-sky-600 hover:text-sky-700"
                >
                  {message.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Subject
          </h4>
          <p className="text-sm font-medium text-slate-900">{message.subject}</p>
        </div>

        {/* Message */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Message
          </h4>
          <div className="text-sm text-slate-700 bg-slate-50 rounded-lg p-4 whitespace-pre-wrap leading-relaxed">
            {message.message}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`mailto:${message.email}?subject=Re: ${message.subject}`}
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-sky-600 text-white text-xs sm:text-sm font-medium hover:bg-sky-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              <span className="hidden sm:inline">Reply</span>
              <span className="sm:hidden">📧</span>
            </a>
            <a
              href={`tel:${message.phone}`}
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-green-600 text-white text-xs sm:text-sm font-medium hover:bg-green-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span className="hidden sm:inline">Call</span>
              <span className="sm:hidden">📞</span>
            </a>
          </div>
        </div>

        {/* Timestamps */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Message Information
          </h4>
          <div className="space-y-1 text-xs text-slate-500">
            <p>Received: {formatDateTime(message.createdAt)}</p>
            {message.updatedAt !== message.createdAt && (
              <p>Last Updated: {formatDateTime(message.updatedAt)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageDetails;
