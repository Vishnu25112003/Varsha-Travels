function MessageList({ messages, onSelect, onDelete, onStarToggle, selectedId }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "read":
        return "bg-slate-100 text-slate-700 border-slate-300";
      case "replied":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`bg-white rounded-xl border-2 p-4 transition cursor-pointer hover:shadow-md relative ${
            selectedId === message._id
              ? "border-sky-500 shadow-md"
              : "border-slate-200"
          } ${message.status === "unread" ? "bg-blue-50/30" : ""}`}
          onClick={() => onSelect(message)}
        >
          {/* Star button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStarToggle(message._id, !message.isStarred);
            }}
            className="absolute top-3 right-3 text-lg hover:scale-110 transition"
          >
            {message.isStarred ? "⭐" : "☆"}
          </button>

          <div className="flex items-start justify-between gap-3 pr-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className={`font-semibold text-slate-900 truncate ${
                    message.status === "unread" ? "font-bold" : ""
                  }`}
                >
                  {message.name}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(
                    message.status
                  )}`}
                >
                  {message.status}
                </span>
              </div>

              <p
                className={`text-sm mb-2 truncate ${
                  message.status === "unread"
                    ? "font-semibold text-slate-900"
                    : "text-slate-700"
                }`}
              >
                {message.subject}
              </p>

              <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                {message.message}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>📧 {message.email}</span>
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(message);
            }}
            className="absolute bottom-3 right-3 text-red-500 hover:text-red-700 transition p-1"
            aria-label="Delete message"
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
