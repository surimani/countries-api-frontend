import React, { useState, useEffect } from 'react';
import { useCountryContext } from '../context/CountryContext';
import { searchCountries } from '../services/CountryService';
import { useFetch } from '../utils/useFetch';
import CountryCard from './CountryCard';
import CountryDetail from './CountryDetail';
import Modal from './Modal';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import TimeZoneFilter from './TimeZoneFilter';
import LazyLoadInfiniteScroller from './LazyLoadInfiniteScroller';
import Loader from './Loader'; 

//List of all countries loaded during initial load. Has filters to search and filter countries.
const CountryList: React.FC = () => {
  const { availableTimeZones } = useCountryContext();
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchByName, setSearchByName] = useState<string>('');
  const [searchByCapital, setSearchByCapital] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('');
  const [displayedCountries, setDisplayedCountries] = useState<any[]>([]);
  const [batchSize] = useState<number>(20);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const { data: filteredCountries, loading, error } = useFetch(searchCountries, { name: searchByName, capital: searchByCapital, region: selectedRegion, timezone: selectedTimeZone });
  useEffect(() => {
    if (filteredCountries) {
        setDisplayedCountries(filteredCountries.slice(0, batchSize));
        setCurrentIndex(batchSize);
    }
  }, [filteredCountries]);

  if (loading) return <Loader />;

  const loadMoreCountries = () => {
    if (!filteredCountries || currentIndex >= filteredCountries.length) return;
    const nextBatch = filteredCountries.slice(currentIndex, currentIndex + batchSize);
    setDisplayedCountries((prev) => [...prev, ...nextBatch]);
    setCurrentIndex(currentIndex + batchSize);
  };

  const handleCardClick = (country: any) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  if (!filteredCountries || filteredCountries.length === 0) {
    return <span>No countries could not be found. Please provide different search criteria.</span>;
  }
  
  return (
    <div className="p-4">
      <div className="flex flex-col justify-center md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 h-full">
        <div className="flex flex-col md:flex-row w-full md:w-1/2 md:space-x-4 space-y-4 md:space-y-0 h-full">
            <SearchBar type='name' searchTerm={searchByName} setSearchTerm={setSearchByName} />
            <SearchBar type='capital' searchTerm={searchByCapital} setSearchTerm={setSearchByCapital} />
        </div>    
        <div className="flex flex-col md:flex-row w-full md:w-1/2 md:space-x-4 space-y-4 md:space-y-0 h-full">
            <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            <TimeZoneFilter selectedTimeZone={selectedTimeZone} setSelectedTimeZone={setSelectedTimeZone} availableTimeZones={availableTimeZones} />
        </div>
        
      </div>
      <LazyLoadInfiniteScroller loadMore={loadMoreCountries} hasMore={currentIndex < filteredCountries.length}>
        <div className="flex flex-wrap justify-center">
            {!error && displayedCountries.length > 0 ? (
                displayedCountries.map((country) => (
                    <div onClick={() => handleCardClick(country)} className='flex-auto sm:flex-[1_0_20%]' key={country.cca3}>
                        <CountryCard country={country} />
                    </div>
                ))
            ) : (
                error ? <div>{error}</div> : <Loader />
            )}
        </div>
      </LazyLoadInfiniteScroller>
      {isModalOpen && selectedCountry && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <CountryDetail code={selectedCountry.cca3}/>
        </Modal>
      )}
    </div>
  );
};

export default CountryList;