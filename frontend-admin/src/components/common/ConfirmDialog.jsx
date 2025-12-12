import React from "react";

function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "danger", onConfirm, onCancel }) {
  if (!open) return null;

  const colorClasses =
    variant === "danger"
      ? {
          badge: "bg-red-100 text-red-700",
          title: "text-red-800",
          button: "bg-red-600 hover:bg-red-700",
        }
      : {
          badge: "bg-slate-100 text-slate-700",
          title: "text-slate-900",
          button: "bg-sky-600 hover:bg-sky-700",
        };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md px-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/15">
          <div className="px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-2xl bg-slate-50 text-red-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colorClasses.badge}`}
                  >
                    Confirm action
                  </span>
                  {title && (
                    <p className={`text-sm font-semibold truncate ${colorClasses.title}`}>
                      {title}
                    </p>
                  )}
                </div>
                {message && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 font-semibold text-white ${colorClasses.button}`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
