import { useState } from "react";
import "./App.css";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import { NotificationProvider } from "./hooks/useNotificationPopup.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  const handleLogin = (email) => {
    setAdminEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminEmail("");
  };

  return (
    <NotificationProvider>
      {isLoggedIn ? (
        <AdminLayout adminEmail={adminEmail} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </NotificationProvider>
  );
}

export default App;
