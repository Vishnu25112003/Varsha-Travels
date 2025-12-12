import { useEffect, useState } from "react";
import MessageList from "./MessageList.jsx";
import MessageDetails from "./MessageDetails.jsx";
import { useNotification } from "../../hooks/useNotificationPopup.jsx";
import ConfirmDialog from "../common/ConfirmDialog.jsx";

const API_BASE_URL = "http://localhost:5000";

function MessageManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showNotification } = useNotification();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/contact`);
      if (!res.ok) {
        throw new Error("Failed to load messages");
      }
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/contact/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update message status");
      }

      const updated = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );

      if (selectedMessage && selectedMessage._id === updated._id) {
        setSelectedMessage(updated);
      }

      showNotification({
        type: "success",
        title: "Status updated",
        message: `Message marked as ${newStatus}`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update message status");
      showNotification({
        type: "error",
        title: "Failed to update status",
        message: err.message || "Something went wrong",
      });
    }
  };

  const handleStarToggle = async (messageId, isStarred) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/contact/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStarred }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update message");
      }

      const updated = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );

      if (selectedMessage && selectedMessage._id === updated._id) {
        setSelectedMessage(updated);
      }
    } catch (err) {
      console.error(err);
      showNotification({
        type: "error",
        title: "Failed to update",
        message: err.message || "Something went wrong",
      });
    }
  };

  const handleDelete = (message) => {
    setPendingDelete(message);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const message = pendingDelete;

    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/contact/${message._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((m) => m._id !== message._id));

      if (selectedMessage && selectedMessage._id === message._id) {
        setSelectedMessage(null);
      }

      showNotification({
        type: "success",
        title: "Message deleted",
        message: `Message from ${message.name} has been removed`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete message");
      showNotification({
        type: "error",
        title: "Failed to delete message",
        message: err.message || "Something went wrong",
      });
    } finally {
      setPendingDelete(null);
    }
  };

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);

    // Mark as read if unread
    if (message.status === "unread") {
      handleStatusChange(message._id, "read");
    }
  };

  const filteredMessages = (() => {
    if (filterStatus === "all") return messages;
    if (filterStatus === "starred") return messages.filter((m) => m.isStarred);
    return messages.filter((m) => m.status === filterStatus);
  })();

  const statusCounts = {
    all: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
    starred: messages.filter((m) => m.isStarred).length,
  };

  return (
    <div className="space-y-4">
      {/* Header + Stats */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Contact Messages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            View and manage all contact form submissions from customers. Mark as
            read, reply, or delete messages.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All", icon: "📬" },
            { key: "unread", label: "Unread", icon: "📩" },
            { key: "read", label: "Read", icon: "📭" },
            { key: "replied", label: "Replied", icon: "✅" },
            { key: "starred", label: "Starred", icon: "⭐" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                filterStatus === tab.key
                  ? "bg-sky-100 text-sky-700 border-2 border-sky-500"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.icon} {tab.label} ({statusCounts[tab.key]})
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
          <p className="mt-2 text-sm text-slate-500">Loading messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">
            No {filterStatus !== "all" && filterStatus} messages found
          </p>
        </div>
      ) : (
        <>
          {/* Mobile/Tablet: Show either list or details */}
          <div className="lg:hidden">
            {!selectedMessage ? (
              <MessageList
                messages={filteredMessages}
                onSelect={handleSelectMessage}
                onDelete={handleDelete}
                onStarToggle={handleStarToggle}
                selectedId={selectedMessage?._id}
              />
            ) : (
              <MessageDetails
                message={selectedMessage}
                onStatusChange={handleStatusChange}
                onStarToggle={handleStarToggle}
                onClose={() => setSelectedMessage(null)}
              />
            )}
          </div>

          {/* Desktop: Show both side by side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            {/* Message List */}
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
              <MessageList
                messages={filteredMessages}
                onSelect={handleSelectMessage}
                onDelete={handleDelete}
                onStarToggle={handleStarToggle}
                selectedId={selectedMessage?._id}
              />
            </div>

            {/* Message Details */}
            {selectedMessage ? (
              <div className="sticky top-4 self-start">
                <MessageDetails
                  message={selectedMessage}
                  onStatusChange={handleStatusChange}
                  onStarToggle={handleStarToggle}
                  onClose={() => setSelectedMessage(null)}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 text-sm">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete message"
        message={
          pendingDelete
            ? `Are you sure you want to delete the message from "${pendingDelete.name}"? This action cannot be undone.`
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

export default MessageManager;
