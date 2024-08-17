import React, { useState } from 'react';
import axios from 'axios';

const FilterComponent = ({ queryinput, setCards }) => {
  const [filters, setFilters] = useState({ age: '', minPrice: '', maxPrice: '', gender: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Updated Filters:', newFilters);

    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/getRecommendations/?query=${queryinput + ' ' + newFilters.age + ' ' + newFilters.gender}`
      );
      setCards(response.data);
    };

    fetchData();
  };

  // Handle changes
  const handleAgeChange = (e) => {
    const updatedFilters = { ...filters, age: e.target.value };
    handleFilterChange(updatedFilters);
  };

  const handleMinPriceChange = (e) => {
    const updatedFilters = { ...filters, minPrice: e.target.value };
    handleFilterChange(updatedFilters);
  };

  const handleMaxPriceChange = (e) => {
    const updatedFilters = { ...filters, maxPrice: e.target.value };
    handleFilterChange(updatedFilters);
  };

  const handleGenderChange = (e) => {
    const updatedFilters = { ...filters, gender: e.target.value };
    handleFilterChange(updatedFilters);
  };

  return (
    <div className="flex space-x-4 p-4 bg-gray-100 rounded-lg">
      {/* Age Filter */}
      <div className="flex items-center space-x-2">
        <label className="font-medium">Age:</label>
        <select
          value={filters.age}
          onChange={handleAgeChange}
          className="px-2 py-1 border rounded-md text-gray-500"
        >
          <option value="" disabled hidden>
            Select Age Group
          </option>
          <option value="child">Child</option>
          <option value="teen">Teen</option>
          <option value="adult">Adult</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex items-center space-x-2">
        <label className="font-medium">Price Range:</label>
        <input
          type="number"
          value={filters.minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min"
          className="w-20 px-2 py-1 border rounded-md"
        />
        <span>-</span>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max"
          className="w-20 px-2 py-1 border rounded-md"
        />
      </div>

      {/* Gender Filter */}
      <div className="flex items-center space-x-2">
        <label className="font-medium">Gender:</label>
        <select
          value={filters.gender}
          onChange={handleGenderChange}
          className="px-2 py-1 border rounded-md text-gray-500"
        >
          <option value="" disabled hidden>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
