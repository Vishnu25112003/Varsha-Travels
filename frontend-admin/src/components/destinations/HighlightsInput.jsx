function HighlightsInput({ values, onChange }) {
  const safeValues = values && values.length ? values : [""];

  const updateAt = (index, nextValue) => {
    const next = [...safeValues];
    next[index] = nextValue;
    onChange(next);
  };

  const addRow = () => {
    onChange([...safeValues, ""]);
  };

  const removeRow = (index) => {
    if (safeValues.length === 1) {
      onChange([""]);
      return;
    }
    const next = safeValues.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {safeValues.map((value, index) => {
        const isLast = index === safeValues.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="e.g., Sunrise point"
              value={value}
              onChange={(e) => updateAt(index, e.target.value)}
            />
            <div className="flex items-center gap-1">
              {isLast && (
                <button
                  type="button"
                  onClick={addRow}
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 text-white w-8 h-8 text-lg leading-none hover:bg-sky-700"
                  aria-label="Add highlight"
                >
                  +
                </button>
              )}
              {safeValues.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-500 w-8 h-8 text-lg leading-none hover:bg-slate-50"
                  aria-label="Remove highlight"
                >
                  -
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HighlightsInput;
