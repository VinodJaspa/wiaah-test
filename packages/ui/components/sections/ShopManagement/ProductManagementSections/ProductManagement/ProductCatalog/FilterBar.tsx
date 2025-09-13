import React, { useState } from "react";
import Select from "react-select";

const statusOptions = [
  { value: "", label: "Status" },
  { value: "online", label: "Online" },
  { value: "out_of_stock", label: "Out of Stock" },
];

const categoryOptions = [
  { value: "", label: "Category" },
  { value: "audio", label: "Audio" },
  { value: "books", label: "Books" },
];

export default function FilterBar() {
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

  return (
    <div className="flex items-center gap-3 mb-4 max-w-md">
      {/* Status Dropdown */}
      <div className="flex-1">
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={(option) => setSelectedStatus(option)}
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#f3f4f6", // tailwind gray-100
              border: "none",
              boxShadow: "none",
              paddingLeft: 8,
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#374151", // tailwind gray-700
              fontSize: 14,
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: "#6b7280", // tailwind gray-500
            }),
            indicatorSeparator: () => null,
          }}
          placeholder="Status"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex-1">
        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={(option) => setSelectedCategory(option)}
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#f3f4f6",
              border: "none",
              boxShadow: "none",
              paddingLeft: 8,
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#374151",
              fontSize: 14,
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: "#6b7280",
            }),
            indicatorSeparator: () => null,
          }}
          placeholder="Category"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
}
