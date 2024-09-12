import React, { useState } from "react";
import DropDown from "/images/Drop-down.svg";

interface BedroomsFilterProps {
  title: string;
  onFilterChange: (selected: number | null) => void;
  isActive?: boolean;
  onToggle?: () => void;
  selected?: number | null;
}

const BedroomsFilter: React.FC<BedroomsFilterProps> = ({
  title,
  onFilterChange,
  isActive,
  onToggle,
  selected,
}) => {
  const [bedrooms, setBedrooms] = useState<number | "">(selected ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBedrooms(value === "" ? "" : parseFloat(value));
  };

  const handleApply = () => {
    if (bedrooms === "" || bedrooms >= 0) {
      onFilterChange(bedrooms === "" ? null : bedrooms);
      if (onToggle) onToggle();
    } else {
      alert("Number of bedrooms must be a non-negative number.");
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-1">
        <button className="w-full p-2 rounded" onClick={onToggle}>
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
          <input
            type="number"
            placeholder="საძინებლების რაოდენობა"
            value={bedrooms === "" ? "" : bedrooms}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
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

export default BedroomsFilter;
