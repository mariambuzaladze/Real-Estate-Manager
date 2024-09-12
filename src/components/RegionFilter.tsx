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
  isActive,
  onToggle,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    string[] | string | null
  >(selected || (multiple ? [] : null));

  const handleOptionChange = (option: string) => {
    if (multiple) {
      setSelectedOptions((prev) => {
        const newSelected = prev as string[];
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
        <div className="w-max gap-1 grid grid-cols-3 absolute bg-white border border-gray-300 mt-1 rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className={`p-2 cursor-pointer ${
                selectedOptions &&
                (selectedOptions as string[]).includes(option)
                  ? "bg-gray-100"
                  : ""
              }`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </div>
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
