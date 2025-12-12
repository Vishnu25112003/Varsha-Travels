function VehicleGalleryList({ vehicles, onEdit, onDelete }) {
  if (!vehicles.length) {
    return (
      <div className="mt-4 text-sm text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
        No vehicles added yet. Use the form above to upload your first car image.
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Desktop / tablet: table */}
      <div className="hidden md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle._id}
                className="border-t border-slate-100 hover:bg-slate-50/80"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {vehicle.name}
                </td>
                <td className="px-4 py-3">
                  {(vehicle.imageUrl || vehicle.imagePreview) && (
                    <img
                      src={vehicle.imageUrl || vehicle.imagePreview}
                      alt={vehicle.name}
                      className="w-16 h-16 rounded-md object-cover border border-slate-200"
                    />
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(vehicle)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(vehicle)}
                      className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="p-4 flex itemsCENTER justify-between gap-3">
            <div className="flex items-center gap-3">
              {(vehicle.imageUrl || vehicle.imagePreview) && (
                <img
                  src={vehicle.imageUrl || vehicle.imagePreview}
                  alt={vehicle.name}
                  className="w-14 h-14 rounded-md object-cover border border-slate-200"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {vehicle.name}
                </p>
              </div>
            </div>
            <div className="inline-flex flex-col xs:flex-row gap-1">
              <button
                type="button"
                onClick={() => onEdit(vehicle)}
                className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 bg-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(vehicle)}
                className="rounded-lg border border-red-200 px-2 py-1 text-[11px] font-medium text-red-600 bg-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleGalleryList;
