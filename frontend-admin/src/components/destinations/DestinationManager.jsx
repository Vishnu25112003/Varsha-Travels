import { useEffect, useState } from "react";
import DestinationForm from "./DestinationForm.jsx";
import DestinationList from "./DestinationList.jsx";
import { useNotification } from "../../hooks/useNotificationPopup.jsx";
import ConfirmDialog from "../common/ConfirmDialog.jsx";

const API_BASE_URL = "http://localhost:5000";

function DestinationManager() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showNotification } = useNotification();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const [filterState, setFilterState] = useState("all");
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState("");
  const [formKey, setFormKey] = useState(0); // Key to force form reset

  // Load destinations from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE_URL}/api/destinations`);
        if (!res.ok) {
          throw new Error("Failed to load destinations");
        }
        const data = await res.json();
        setDestinations(data);
        const uniqueStates = Array.from(new Set(data.map((d) => d.state))).sort();
        setStates(uniqueStates);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = (() => {
    if (filterState === "all") return destinations;
    return destinations.filter((d) => d.state === filterState);
  })();

  const uploadImageIfNeeded = async (imageFile) => {
    if (!imageFile) return { imageUrl: "", imagePublicId: "" };
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Image upload failed");
    }
    const data = await res.json();
    return { imageUrl: data.secureUrl, imagePublicId: data.publicId };
  };

  const handleCreate = async (data) => {
    try {
      setError("");
      let imageUrl = "";
      let imagePublicId = "";
      if (data.imageFile) {
        const uploaded = await uploadImageIfNeeded(data.imageFile);
        imageUrl = uploaded.imageUrl;
        imagePublicId = uploaded.imagePublicId;
      }

      const res = await fetch(`${API_BASE_URL}/api/destinations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          state: data.state,
          details: data.details,
          highlights: data.highlights,
          imageUrl,
          imagePublicId,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to create destination");
      }
      const created = await res.json();
      setDestinations((prev) => [created, ...prev]);
      if (!states.includes(created.state)) {
        setStates((prev) => [...prev, created.state].sort());
      }
      setEditing(null);
      // Force form reset by changing key
      setFormKey((prev) => prev + 1);
      showNotification({
        type: "success",
        title: "Destination added",
        message: `"${created.name}" has been added successfully.`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create destination");
      showNotification({
        type: "error",
        title: "Failed to add destination",
        message: err.message || "Something went wrong while creating the destination.",
      });
    }
  };

  const handleUpdate = async (data) => {
    if (!editing) return;
    try {
      setError("");
      let imageUrl = editing.imageUrl || "";
      let imagePublicId = editing.imagePublicId || "";

      if (data.imageFile) {
        const uploaded = await uploadImageIfNeeded(data.imageFile);
        imageUrl = uploaded.imageUrl;
        imagePublicId = uploaded.imagePublicId;
      }

      const res = await fetch(`${API_BASE_URL}/api/destinations/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          state: data.state,
          details: data.details,
          highlights: data.highlights,
          imageUrl,
          imagePublicId,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update destination");
      }
      const updated = await res.json();
      setDestinations((prev) => prev.map((d) => (d._id === updated._id ? updated : d)));
      if (!states.includes(updated.state)) {
        setStates((prev) => [...prev, updated.state].sort());
      }
      setEditing(null);
      showNotification({
        type: "success",
        title: "Destination updated",
        message: `"${updated.name}" has been updated successfully.`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update destination");
      showNotification({
        type: "error",
        title: "Failed to update destination",
        message: err.message || "Something went wrong while updating the destination.",
      });
    }
  };

  const handleDelete = (dest) => {
    setPendingDelete(dest);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const dest = pendingDelete;
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/destinations/${dest._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete destination");
      }
      setDestinations((prev) => prev.filter((d) => d._id !== dest._id));
      if (editing && editing._id === dest._id) {
        setEditing(null);
      }
      showNotification({
        type: "success",
        title: "Destination deleted",
        message: `"${dest.name}" has been removed.`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete destination");
      showNotification({
        type: "error",
        title: "Failed to delete destination",
        message: err.message || "Something went wrong while deleting the destination.",
      });
    } finally {
      setPendingDelete(null);
    }
  };

  const onSubmit = (payload) => {
    if (editing) {
      handleUpdate(payload);
    } else {
      handleCreate(payload);
    }
  };

  const handleAddState = () => {
    const value = newState.trim();
    if (!value) return;
    if (states.includes(value)) {
      setNewState("");
      return;
    }
    setStates((prev) => [...prev, value].sort());
    setNewState("");
  };

  const handleRemoveState = (value) => {
    // Do not remove if there are destinations using this state
    const inUse = destinations.some((d) => d.state === value);
    if (inUse) {
      showNotification({
        type: "error",
        title: "State in use",
        message: `Cannot remove state "${value}" because it is used by one or more destinations.`,
      });
      return;
    }
    setStates((prev) => prev.filter((st) => st !== value));
    if (filterState === value) {
      setFilterState("all");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header + filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Manage destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Add, update, or remove places that appear in your user Destination
            page. Fields are aligned with the data used in the frontend-user
            app (name, state, details, highlights).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600">
            Filter by state:
          </label>
          <select
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs sm:text-sm bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="all">All</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State add / remove section */}
      <div className="flex flex-col gap-2 sm:gap-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-700 mb-1">
              Manage states
            </p>
            <p className="text-[11px] text-slate-500">
              States added here will appear in the state dropdown of the
              destination form and the filter above.
            </p>
          </div>
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="e.g., Kerala"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddState}
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-sky-700"
            >
              + State
            </button>
          </div>
        </div>
        {states.length > 0 && (
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
            {states.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleRemoveState(st)}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 hover:bg-slate-100"
              >
                <span>{st}</span>
                <span className="text-slate-400 text-xs">✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <DestinationForm
        key={editing ? editing._id : `new-${formKey}`}
        initialValues={editing}
        mode={editing ? "edit" : "create"}
        onSubmit={onSubmit}
        onCancel={editing ? () => setEditing(null) : undefined}
        states={states}
      />

      <DestinationList
        destinations={filteredDestinations}
        onEdit={(dest) => setEditing(dest)}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete destination"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.name}" from ${pendingDelete.state}?`
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

export default DestinationManager;
