import { useState } from "react";
import { useNotification } from "../hooks/useNotificationPopup.jsx";

const API_BASE_URL = "http://localhost:5000"; // backend used for OTP emails

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { showNotification } = useNotification();

  const normalizedEmail = email.trim();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!normalizedEmail) return;

    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/admin/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || "Failed to send OTP");
      }

      setStep("otp");
      setOtp("");
      showNotification({
        type: "success",
        title: "OTP sent",
        message: `We have sent a one-time password to ${normalizedEmail}. Please check your inbox.`,
      });
    } catch (err) {
      console.error(err);
      const message = err.message || "Failed to send OTP";
      setError(message);
      showNotification({
        type: "error",
        title: "OTP not sent",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!normalizedEmail || !otp.trim()) return;

    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, otp: otp.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || "Invalid OTP");
      }

      showNotification({
        type: "success",
        title: "Login successful",
        message: "OTP verified. You are now logged in to the admin panel.",
      });
      onLogin(normalizedEmail);
    } catch (err) {
      console.error(err);
      const message = err.message || "Invalid OTP";
      setError(message);
      showNotification({
        type: "error",
        title: "OTP verification failed",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
        <h1 className="text-2xl font-semibold text-slate-900 text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-slate-500 text-center mb-6">
          Sign in using the registered admin email from your Contact settings.
        </p>

        <form
          onSubmit={step === "email" ? handleRequestOtp : handleVerifyOtp}
          className="space-y-4"
        >
          {step === "email" ? (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Registered admin email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="your-admin-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Use the same email configured in Contact settings for sending messages.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm tracking-[0.4em] text-center outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  OTP has been sent to <span className="font-medium">{normalizedEmail}</span>. It is valid for 5 minutes.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRequestOtp}
                className="text-[11px] text-sky-700 hover:text-sky-800"
                disabled={loading}
              >
                Resend OTP
              </button>
            </>
          )}

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 mt-2">
            {step === "otp" && (
              <button
                type="button"
                onClick={handleBackToEmail}
                className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                disabled={loading}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-60"
              disabled={loading || (step === "email" ? !normalizedEmail : !otp.trim())}
            >
              {loading
                ? step === "email"
                  ? "Sending OTP..."
                  : "Verifying..."
                : step === "email"
                ? "Send OTP"
                : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
