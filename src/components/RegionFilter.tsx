import React, { useState } from "react";
import DropDown from "/images/Drop-down.svg";

interface FilterProps {
  title: string;
  options: string[];
  onFilterChange: (selected: string[] | string | null) => void;
  multiple?: boolean;
  selected?: string[] | string | null;
  isActive?: boolean;
  onToggle?: () => void;
}

const RegionFilter: React.FC<FilterProps> = ({
  title,
  options,
  onFilterChange,
  multiple = false,
  selected,
  isActive = false, // Default to false if not provided
  onToggle,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    string[] | string | null
  >(selected || (multiple ? [] : null));

  const handleOptionChange = (option: string) => {
    if (multiple) {
      setSelectedOptions((prev) => {
        const newSelected = Array.isArray(prev) ? prev : [];
        if (newSelected.includes(option)) {
          return newSelected.filter((o) => o !== option);
        } else {
          return [...newSelected, option];
        }
      });
    } else {
      setSelectedOptions(option);
    }
  };

  const handleApply = () => {
    onFilterChange(selectedOptions);
    if (onToggle) onToggle();
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
        <div className="w-max gap-1 grid grid-cols-3 absolute bg-white border border-gray-300 mt-1 rounded shadow-lg">
          {options.map((option) => (
            <label
              key={option}
              className="p-2 cursor-pointer flex items-center"
            >
              <input
                type="checkbox"
                checked={
                  Array.isArray(selectedOptions) &&
                  selectedOptions.includes(option)
                }
                onChange={() => handleOptionChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}

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

export default RegionFilter;
