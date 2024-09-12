interface ChosenFiltersProps {
  filters: {
    region: string[];
    price: { min: number; max: number } | null;
    area: { min: number; max: number } | null;
    bedroom: number | null;
  };
  onRemove: (filterType: string, value: any) => void;
  onReset: () => void;
}

const ChosenFilters: React.FC<ChosenFiltersProps> = ({
  filters,
  onRemove,
  onReset,
}) => {
  const hasFilters = Object.values(filters).some(
    (value) =>
      (Array.isArray(value) && value.length > 0) ||
      (value &&
        typeof value === "object" &&
        ("min" in value || "max" in value)) ||
      (typeof value === "number" && value >= 0)
  );

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.region.map((region) => (
        <div
          key={region}
          className="rounded-[15px] border border-gray-300 p-2 rounded flex items-center"
        >
          <span>{region}</span>
          <button
            onClick={() => onRemove("region", region)}
            className="ml-2 text-red-500"
          >
            x
          </button>
        </div>
      ))}

      {filters.price && (
        <div
          key="price"
          className="rounded-[15px] border border-gray-300 p-2 rounded flex items-center"
        >
          <span>
            {filters.price.min} - {filters.price.max} ₾
          </span>
          <button
            onClick={() => onRemove("price", filters.price)}
            className="ml-2 text-red-500"
          >
            x
          </button>
        </div>
      )}

      {filters.area && (
        <div
          key="area"
          className="rounded-[15px] border border-gray-300 p-2 rounded flex items-center"
        >
          <span>
            {filters.area.min} - {filters.area.max} მ&sup2;
          </span>
          <button
            onClick={() => onRemove("area", filters.area)}
            className="ml-2 text-red-500"
          >
            x
          </button>
        </div>
      )}

      {filters.bedroom !== null && (
        <div
          key="bedroom"
          className="rounded-[15px] border border-gray-300 p-2 rounded flex items-center"
        >
          <span>{filters.bedroom}</span>
          <button
            onClick={() => onRemove("bedroom", filters.bedroom)}
            className="ml-2 text-red-500"
          >
            x
          </button>
        </div>
      )}

      {hasFilters && (
        <button onClick={onReset} className="font-bold text-[#021526] ml-4">
          გასუფთავება
        </button>
      )}
    </div>
  );
};

export default ChosenFilters;
