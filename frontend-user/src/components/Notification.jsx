import React, { useEffect } from 'react';

export default function Notification({ type = 'success', message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
      border: 'border-green-500',
      icon: '✓',
      iconBg: 'bg-green-500',
      text: 'text-green-800',
    },
    error: {
      bg: 'bg-gradient-to-r from-red-50 to-rose-50',
      border: 'border-red-500',
      icon: '✕',
      iconBg: 'bg-red-500',
      text: 'text-red-800',
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-50 to-sky-50',
      border: 'border-blue-500',
      icon: 'ℹ',
      iconBg: 'bg-blue-500',
      text: 'text-blue-800',
    },
  };

  const style = styles[type] || styles.success;

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slide-in-right">
      <div
        className={`${style.bg} ${style.border} border-l-4 rounded-lg shadow-2xl p-4 pr-12 max-w-md min-w-[320px] backdrop-blur-sm`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`${style.iconBg} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shrink-0`}
          >
            {style.icon}
          </div>

          {/* Message */}
          <div className="flex-1 pt-0.5">
            <p className={`${style.text} font-semibold text-sm leading-relaxed`}>
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`${style.text} hover:opacity-70 transition-opacity absolute top-3 right-3`}
            aria-label="Close notification"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className={`h-full ${style.iconBg} animate-progress`}
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
