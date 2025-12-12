import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import NotificationPopup from "../components/common/NotificationPopup.jsx";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  const showNotification = useCallback(({ type = "info", title = "", message = "" }) => {
    setNotification({
      open: true,
      type,
      title,
      message,
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  // Auto-dismiss after a few seconds when open
  useEffect(() => {
    if (!notification.open) return;
    const timeout = setTimeout(() => {
      hideNotification();
    }, 3500);
    return () => clearTimeout(timeout);
  }, [notification.open, hideNotification]);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}
      <NotificationPopup
        open={notification.open}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return ctx;
}
