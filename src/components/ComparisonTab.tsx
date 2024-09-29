import React, { useState, useEffect } from 'react';

interface CountryComparisonProps {
  countries: any[];
}

//Compare two countries and show their differences
const ComparisonTab: React.FC<CountryComparisonProps> = ({ countries }) => {
  const [country1, setCountry1] = useState<string>('United Kingdom');
  const [country2, setCountry2] = useState<string>('United States');
  const [selectedCountry1, setSelectedCountry1] = useState<any>('');
  const [selectedCountry2, setSelectedCountry2] = useState<any>('');
  useEffect(() => {
    setSelectedCountry1(countries.find((country) => country.name === country1))
  }, [countries, country1]);
  useEffect(() => {
    setSelectedCountry2(countries.find((country) => country.name === country2))
  }, [countries, country2]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Compare Countries:</h2>
      <div className="flex flex-col md:flex-row w-full md:w-1/2 md:space-x-4 space-y-4 md:space-y-0 h-full mb-6">
        <div className="flex-1">
          <label htmlFor="country1" className="block mb-2">Select Country 1:</label>
          <select id="country1" value={country1} onChange={(e) => setCountry1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select country...</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="country2" className="block mb-2">Select Country 2:</label>
          <select id="country2" value={country2} onChange={(e) => setCountry2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select country...</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full md:space-x-4 space-y-4 md:space-y-0 h-full mb-6">
        {selectedCountry1 && (
          <div className="flex-1 border p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{selectedCountry1.name}</h3>
            <img src={selectedCountry1.flags.png} alt={`${selectedCountry1.name} flag`} className="w-full h-64 object-contain rounded mb-4" />
            <p><strong>Population:</strong> {selectedCountry1.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {selectedCountry1.region}</p>
            <p><strong>Capital:</strong> {selectedCountry1.capital.join(', ')}</p>
            <p><strong>Currency:</strong> {Object.values(selectedCountry1.currencies).map((currency: any) => currency.name).join(', ')}</p>
            <p><strong>Languages:</strong> {Object.values(selectedCountry1.languages).join(', ')}</p>
          </div>
        )}
        {selectedCountry2 && (
          <div className="flex-1 border p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{selectedCountry2.name}</h3>
            <img src={selectedCountry2.flags.png} alt={`${selectedCountry2.name} flag`} className="w-full h-64 object-contain rounded mb-4" />
            <p><strong>Population:</strong> {selectedCountry2.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {selectedCountry2.region}</p>
            <p><strong>Capital:</strong> {selectedCountry2.capital.join(', ')}</p>
            <p><strong>Currency:</strong> {Object.values(selectedCountry2.currencies).map((currency: any) => currency.name).join(', ')}</p>
            <p><strong>Languages:</strong> {Object.values(selectedCountry2.languages).join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTab;
