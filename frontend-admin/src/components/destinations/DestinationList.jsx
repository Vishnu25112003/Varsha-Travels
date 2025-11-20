function DestinationList({ destinations, onEdit, onDelete }) {
  if (!destinations.length) {
    return (
      <div className="mt-4 text-sm text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
        No destinations added yet. Use the form above to add your first place.
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Desktop/tablet: table */}
      <div className="hidden md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <th className="px-4 py-3">Place</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Highlights</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest.id} className="border-t border-slate-100 hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {dest.name}
                </td>
                <td className="px-4 py-3 text-slate-700">{dest.state}</td>
                <td className="px-4 py-3 text-slate-600">
                  <div className="flex flex-wrap gap-1">
                    {dest.highlights.slice(0, 3).map((h, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700"
                      >
                        {h}
                      </span>
                    ))}
                    {dest.highlights.length > 3 && (
                      <span className="text-[11px] text-slate-400">
                        +{dest.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {(dest.imageUrl || dest.imagePreview) && (
                    <img
                      src={dest.imageUrl || dest.imagePreview}
                      alt={dest.name}
                      className="w-12 h-12 rounded-md object-cover border border-slate-200"
                    />
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(dest)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(dest)}
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
        {destinations.map((dest) => (
          <div key={dest.id} className="p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                {(dest.imageUrl || dest.imagePreview) && (
                  <img
                    src={dest.imageUrl || dest.imagePreview}
                    alt={dest.name}
                    className="w-12 h-12 rounded-md object-cover border border-slate-200"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {dest.name}
                  </p>
                  <p className="text-xs text-sky-700 font-medium mt-0.5">
                    {dest.state}
                  </p>
                </div>
              </div>
              <div className="inline-flex gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(dest)}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 bg-white"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(dest)}
                  className="rounded-lg border border-red-200 px-2 py-1 text-[11px] font-medium text-red-600 bg-white"
                >
                  Delete
                </button>
              </div>
            </div>
            {dest.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {dest.highlights.slice(0, 3).map((h, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700"
                  >
                    {h}
                  </span>
                ))}
                {dest.highlights.length > 3 && (
                  <span className="text-[11px] text-slate-400">
                    +{dest.highlights.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationList;
