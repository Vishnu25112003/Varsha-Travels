import React from "react";

// Reusable popup / toast component for admin notifications
// type: "success" | "error" | "info"
function NotificationPopup({ open, type = "info", title, message, onClose }) {
  if (!open) return null;

  const styles = {
    success: {
      container: "border-emerald-200 bg-emerald-50/95 text-emerald-900",
      badge: "bg-emerald-100 text-emerald-700",
      icon: "text-emerald-500",
      label: "Success",
    },
    error: {
      container: "border-red-200 bg-red-50/95 text-red-900",
      badge: "bg-red-100 text-red-700",
      icon: "text-red-500",
      label: "Error",
    },
    info: {
      container: "border-slate-200 bg-white/95 text-slate-900",
      badge: "bg-slate-100 text-slate-700",
      icon: "text-sky-500",
      label: "Info",
    },
  }[type] || styles.info;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pointer-events-none">
      {/* Clickable/blur background for accessibility */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="mt-20 w-full max-w-sm px-4 sm:px-0 pointer-events-auto">
        <div
          className={`relative overflow-hidden rounded-2xl border shadow-xl shadow-slate-900/10 backdrop-blur-sm ${styles.container}`}
        >
          <div className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4">
            <div
              className={`mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-white/60 ${styles.icon}`}
            >
              {/* Simple icon circle */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                {type === "success" && (
                  <path d="M5 13l4 4L19 7" />
                )}
                {type === "error" && (
                  <>
                    <path d="M12 8v5" />
                    <path d="M12 16h.01" />
                    <circle cx="12" cy="12" r="9" />
                  </>
                )}
                {type === "info" && (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </>
                )}
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}
                >
                  {styles.label}
                </span>
                {title && (
                  <p className="text-xs sm:text-sm font-semibold truncate">
                    {title}
                  </p>
                )}
              </div>

              {message && (
                <p className="text-[11px] sm:text-xs leading-relaxed text-slate-700 mt-0.5">
                  {message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="ml-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <span className="sr-only">Close notification</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopup;
