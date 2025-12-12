import { useState } from "react";
import HighlightsInput from "./HighlightsInput.jsx";

function DestinationForm({
  initialValues,
  onSubmit,
  onCancel,
  states = [],
  mode = "create", // "create" | "edit"
}) {
  const [form, setForm] = useState(() => {
    const base = initialValues || {};
    const existingPreview = base.imagePreview || base.imageUrl || "";
    return {
      name: base.name || "",
      state: base.state || "",
      details: base.details || "",
      highlights:
        Array.isArray(base.highlights) && base.highlights.length > 0
          ? base.highlights
          : [""],
      // For upload: we keep the selected File and a local preview URL
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

    if (!form.name.trim() || !form.state.trim()) {
      return;
    }

    const trimmedHighlights = form.highlights
      .map((h) => h.trim())
      .filter(Boolean);

    onSubmit({
      name: form.name.trim(),
      state: form.state.trim(),
      details: form.details.trim(),
      highlights: trimmedHighlights,
      imageFile: form.imageFile || null,
      imagePreview: form.imagePreview || "",
    });
  };

  const title = mode === "edit" ? "Update Destination" : "Add New Destination";

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
            Place name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Kanyakumari Beach"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            State<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
          >
            <option value="">Select a state</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Details / description
        </label>
        <textarea
          rows={3}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-y"
          placeholder="Short description of the destination, highlights, best time to visit, etc."
          value={form.details}
          onChange={(e) => handleChange("details", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Highlights
        </label>
        <HighlightsInput
          values={form.highlights}
          onChange={(next) => handleChange("highlights", next)}
        />
        <p className="mt-1 text-[11px] text-slate-500">
          Each field is one highlight. These map to the "highlights" list used
          in your user destination page.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Upload image (optional)
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
              Preview of the selected image (local only).
            </span>
          </div>
        )}
        <p className="mt-1 text-[11px] text-slate-500">
          Choose an image from your computer. It will be uploaded to Cloudinary
          when you save the destination.
        </p>
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
          {mode === "edit" ? "Save changes" : "Add destination"}
        </button>
      </div>
    </form>
  );
}

export default DestinationForm;
