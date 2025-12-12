import { useEffect, useState } from "react";
import VehicleGalleryForm from "./VehicleGalleryForm.jsx";
import VehicleGalleryList from "./VehicleGalleryList.jsx";
import { useNotification } from "../../hooks/useNotificationPopup.jsx";
import ConfirmDialog from "../common/ConfirmDialog.jsx";

const API_BASE_URL = "https://varsha-travels.onrender.com"; // adjust for production

function VehicleGalleryManager() {
  const [vehicles, setVehicles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showNotification } = useNotification();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [formKey, setFormKey] = useState(0); // Key to force form reset

  // Load vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE_URL}/api/vehicles`);
        if (!res.ok) throw new Error("Failed to load vehicle gallery");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load vehicle gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const uploadImageIfNeeded = async (imageFile) => {
    if (!imageFile) throw new Error("Image file is required");
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
      const uploaded = await uploadImageIfNeeded(data.imageFile);

      const res = await fetch(`${API_BASE_URL}/api/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          imageUrl: uploaded.imageUrl,
          imagePublicId: uploaded.imagePublicId,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to create vehicle");
      }
      const created = await res.json();
      setVehicles((prev) => [created, ...prev]);
      setEditing(null);
      // Force form reset by changing key
      setFormKey((prev) => prev + 1);
      showNotification({
        type: "success",
        title: "Vehicle added",
        message: `"${created.name}" has been added to the gallery.`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create vehicle");
      showNotification({
        type: "error",
        title: "Failed to add vehicle",
        message: err.message || "Something went wrong while creating the vehicle.",
      });
    }
  };

  const handleUpdate = async (data) => {
    if (!editing) return;
    try {
      setError("");
      let imageUrl = editing.imageUrl;
      let imagePublicId = editing.imagePublicId;

      if (data.imageFile) {
        const uploaded = await uploadImageIfNeeded(data.imageFile);
        imageUrl = uploaded.imageUrl;
        imagePublicId = uploaded.imagePublicId;
      }

      const res = await fetch(`${API_BASE_URL}/api/vehicles/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          imageUrl,
          imagePublicId,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update vehicle");
      }
      const updated = await res.json();
      setVehicles((prev) => prev.map((v) => (v._id === updated._id ? updated : v)));
      setEditing(null);
      showNotification({
        type: "success",
        title: "Vehicle updated",
        message: `"${updated.name}" has been updated successfully.`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update vehicle");
      showNotification({
        type: "error",
        title: "Failed to update vehicle",
        message: err.message || "Something went wrong while updating the vehicle.",
      });
    }
  };

  const handleDelete = (vehicle) => {
    setPendingDelete(vehicle);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const vehicle = pendingDelete;
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/vehicles/${vehicle._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to delete vehicle");
      }
      setVehicles((prev) => prev.filter((v) => v._id !== vehicle._id));
      if (editing && editing._id === vehicle._id) {
        setEditing(null);
      }
      showNotification({
        type: "success",
        title: "Vehicle deleted",
        message: `"${vehicle.name}" has been removed from the gallery.`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete vehicle");
      showNotification({
        type: "error",
        title: "Failed to delete vehicle",
        message: err.message || "Something went wrong while deleting the vehicle.",
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Vehicle gallery</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Upload, update, or remove car images that appear in your user Gallery
            page. This admin view is fully responsive for mobile, tablet, and
            desktop.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Create / edit form */}
      <VehicleGalleryForm
        key={editing ? editing._id : `new-${formKey}`}
        initialValues={editing}
        mode={editing ? "edit" : "create"}
        onSubmit={onSubmit}
        onCancel={editing ? () => setEditing(null) : undefined}
      />

      {/* List */}
      <VehicleGalleryList
        vehicles={vehicles}
        onEdit={(v) => setEditing(v)}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete vehicle"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.name}" from the gallery?`
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

export default VehicleGalleryManager;
