import React, { useState } from "react";
import DropDown from "/images/Drop-down.svg";

interface RangeFilterProps {
  title: string;
  onFilterChange: (selected: { min: number; max: number } | null) => void;
  isActive?: boolean;
  onToggle?: () => void;
  selected?: { min: number; max: number } | null;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  title,
  onFilterChange,
  isActive,
  onToggle,
  selected,
}) => {
  const [minValue, setMinValue] = useState<number | "">(selected?.min ?? "");
  const [maxValue, setMaxValue] = useState<number | "">(selected?.max ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinValue(value === "" ? "" : parseFloat(value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxValue(value === "" ? "" : parseFloat(value));
  };

  const handleApply = () => {
    if (minValue === "" || maxValue === "" || minValue <= maxValue) {
      onFilterChange({
        min: minValue === "" ? 0 : minValue,
        max: maxValue === "" ? Infinity : maxValue,
      });
      setError(null);
      if (onToggle) onToggle();
    } else {
      setError("მინიმუმი არ შეიძლება მაქსიმუმზე მეტი იყოს");
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-1">
        <button className="w-full p-2 rounded font-bold" onClick={onToggle}>
          {title}
        </button>
        <img
          src={DropDown}
          alt="drop down icon"
          style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {isActive && (
        <div className="absolute bg-white border border-gray-300 mt-1 rounded shadow-lg p-4 flex flex-col gap-4 w-[400px]">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="დან"
              value={minValue === "" ? "" : minValue}
              onChange={handleMinChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="მდე"
              value={maxValue === "" ? "" : maxValue}
              onChange={handleMaxChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleApply}
            className="w-full bg-orange-500 text-white p-2 rounded"
          >
            არჩევა
          </button>
        </div>
      )}
    </div>
  );
};

export default RangeFilter;
