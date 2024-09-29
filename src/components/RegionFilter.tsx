import React from 'react';

interface RegionFilterProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

//Filter to search by region
const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}
      className="p-2 border border-gray-300 rounded-md mb-4 w-full h-full"
    >
      <option value="">Filter by Region...</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default RegionFilter;