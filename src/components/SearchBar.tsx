import React, { useState } from 'react';

interface SearchBarProps {
    type: string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

//Generic Search bar to search for any country details by name or capital
const SearchBar: React.FC<SearchBarProps> = ({ type, searchTerm, setSearchTerm }) => {
  const [currSearch, setCurrSearch] = useState<string>('');
  const handleClearSearch = () => {
    setCurrSearch('');
    setSearchTerm('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrSearch(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchTerm(currSearch);
    }
  };
  return (
    <div className="relative flex items-center w-full md:w-1/2">
        <input type="text" placeholder={`Search by ${type}...`} value={currSearch || searchTerm}
            onChange={handleChange} onKeyDown={handleKeyDown}
            className="w-full mb-4 px-4 py-2 pr-16 border border-gray-300 rounded-md outline-none"
        />    
        {(currSearch || searchTerm) && (
            <button type="button" onClick={handleClearSearch} className="absolute right-1 mb-4">
                <span className="text-4xl text-gray-500 font-bold">&times;</span>
            </button>
        )}
    </div>
  );
};

export default SearchBar;
