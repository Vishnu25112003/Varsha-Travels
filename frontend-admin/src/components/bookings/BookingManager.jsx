import { useEffect, useState } from "react";
import BookingList from "./BookingList.jsx";
import BookingDetails from "./BookingDetails.jsx";
import { useNotification } from "../../hooks/useNotificationPopup.jsx";
import ConfirmDialog from "../common/ConfirmDialog.jsx";

const API_BASE_URL = "https://varsha-travels.onrender.com";

function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showNotification } = useNotification();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  // Load bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      if (!res.ok) {
        throw new Error("Failed to load bookings");
      }
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update booking status");
      }

      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );

      if (selectedBooking && selectedBooking._id === updated._id) {
        setSelectedBooking(updated);
      }

      showNotification({
        type: "success",
        title: "Status updated",
        message: `Booking status changed to ${newStatus}`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update booking status");
      showNotification({
        type: "error",
        title: "Failed to update status",
        message: err.message || "Something went wrong",
      });
    }
  };

  const handleDelete = (booking) => {
    setPendingDelete(booking);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const booking = pendingDelete;

    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/bookings/${booking._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete booking");
      }

      setBookings((prev) => prev.filter((b) => b._id !== booking._id));

      if (selectedBooking && selectedBooking._id === booking._id) {
        setSelectedBooking(null);
      }

      showNotification({
        type: "success",
        title: "Booking deleted",
        message: `Booking for ${booking.fullName} has been removed`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete booking");
      showNotification({
        type: "error",
        title: "Failed to delete booking",
        message: err.message || "Something went wrong",
      });
    } finally {
      setPendingDelete(null);
    }
  };

  const filteredBookings = (() => {
    if (filterStatus === "all") return bookings;
    return bookings.filter((b) => b.status === filterStatus);
  })();

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  return (
    <div className="space-y-4">
      {/* Header + Stats */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Manage Bookings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            View and manage all booking requests from customers. Update status,
            view details, and delete bookings.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All", color: "slate" },
            { key: "pending", label: "Pending", color: "yellow" },
            { key: "confirmed", label: "Confirmed", color: "green" },
            { key: "completed", label: "Completed", color: "blue" },
            { key: "cancelled", label: "Cancelled", color: "red" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                filterStatus === tab.key
                  ? `bg-${tab.color}-100 text-${tab.color}-700 border-2 border-${tab.color}-500`
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.label} ({statusCounts[tab.key]})
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
          <p className="mt-2 text-sm text-slate-500">Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">
            No {filterStatus !== "all" && filterStatus} bookings found
          </p>
        </div>
      ) : (
        <>
          {/* Mobile/Tablet: Show either list or details */}
          <div className="lg:hidden">
            {!selectedBooking ? (
              <BookingList
                bookings={filteredBookings}
                onSelect={(booking) => setSelectedBooking(booking)}
                onDelete={handleDelete}
                selectedId={selectedBooking?._id}
              />
            ) : (
              <BookingDetails
                booking={selectedBooking}
                onStatusChange={handleStatusChange}
                onClose={() => setSelectedBooking(null)}
              />
            )}
          </div>

          {/* Desktop: Show both side by side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            {/* Booking List */}
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
              <BookingList
                bookings={filteredBookings}
                onSelect={(booking) => setSelectedBooking(booking)}
                onDelete={handleDelete}
                selectedId={selectedBooking?._id}
              />
            </div>

            {/* Booking Details */}
            {selectedBooking ? (
              <div className="sticky top-4 self-start">
                <BookingDetails
                  booking={selectedBooking}
                  onStatusChange={handleStatusChange}
                  onClose={() => setSelectedBooking(null)}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 text-sm">
                  Select a booking to view details
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete booking"
        message={
          pendingDelete
            ? `Are you sure you want to delete the booking for "${pendingDelete.fullName}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default BookingManager;
