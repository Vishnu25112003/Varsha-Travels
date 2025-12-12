import { useState } from "react";

function VehicleGalleryForm({ initialValues, onSubmit, onCancel, mode = "create" }) {
  const [form, setForm] = useState(() => {
    const base = initialValues || {};
    const existingPreview = base.imagePreview || base.imageUrl || "";
    return {
      name: base.name || "",
      imageFile: base.imageFile || null,
      imagePreview: existingPreview,
    };
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    onSubmit({
      name: form.name.trim(),
      imageFile: form.imageFile || null,
      imagePreview: form.imagePreview || "",
    });
  };

  const title = mode === "edit" ? "Update vehicle image" : "Add vehicle image";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          {title}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Vehicle name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Maruti Swift"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Use the same vehicle name used on your user gallery (e.g., "Maruti Swift").
          </p>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Upload vehicle image<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-xs sm:text-sm text-slate-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
            onChange={handleImageChange}
          />
          {form.imagePreview && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
              <img
                src={form.imagePreview}
                alt="Preview"
                className="w-16 h-16 rounded-md object-cover"
              />
              <span className="text-[11px] text-slate-500">
                Preview of the selected image (from Cloudinary or new upload).
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center rounded-lg border border-slate-200 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-lg bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          {mode === "edit" ? "Save changes" : "Add image"}
        </button>
      </div>
    </form>
  );
}

export default VehicleGalleryForm;
