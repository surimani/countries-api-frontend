import React from 'react';

interface TimeZoneFilterProps {
  selectedTimeZone: string;
  setSelectedTimeZone: (timeZone: string) => void;
  availableTimeZones: string[];
}

//Filter to search by timezone
const TimeZoneFilter: React.FC<TimeZoneFilterProps> = ({ selectedTimeZone, setSelectedTimeZone, availableTimeZones }) => {
  return (
    <select value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)}
      className="p-2 border border-gray-300 rounded-md mb-4 w-full h-full"
    >
      <option value="">Filter by Time Zone...</option>
      {availableTimeZones.map((timezone) => (
        <option key={timezone} value={timezone}>
          {timezone}
        </option>
      ))}
    </select>
  );
};

export default TimeZoneFilter;
