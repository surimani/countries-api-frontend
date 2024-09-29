import React, { useState } from 'react';
import { useCountryContext } from '../context/CountryContext';
import CountryList from '../components/CountryList';
import ChartsTab from '../components/ChartsTab';
import ComparisonTab from '../components/ComparisonTab';
import CountriesMapTab from '../components/CountriesMapTab';
import ErrorBoundary from './../components/ErrorBoundary';

//HomePage configured with various tabs
const HomePage: React.FC = () => {
  const { countries } = useCountryContext();
  const [selectedTab, setSelectedTab] = useState<string>('countries');
  return (
    <ErrorBoundary>
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md">
                <div className="flex">
                    <div className="flex border-gray-200">
                        <button onClick={() => setSelectedTab('countries')}
                            className={`flex-1 px-4 py-2 text-center transition duration-300 rounded-t-md border-b-4 border-l-2 border-r-2 ${
                            selectedTab === 'countries' ? ' border-blue-500 text-blue-500 bg-blue-100' 
                            : 'text-gray-500 hover:text-blue-500 hover:border-blue-300'
                        }`}
                        >
                            Countries
                        </button>
                        <button onClick={() => setSelectedTab('charts')}
                            className={`flex-1 px-4 py-2 text-center transition duration-300 rounded-t-md border-b-4 border-l-2 border-r-2 ${
                            selectedTab === 'charts' ? 'border-blue-500 text-blue-500 bg-blue-100' 
                            : 'text-gray-500 hover:text-blue-500 hover:border-blue-300'
                        }`}
                        >
                            Charts
                        </button>
                        <button onClick={() => setSelectedTab('map')}
                            className={`flex-1 px-4 py-2 text-center transition duration-300 rounded-t-md border-b-4 border-l-2 border-r-2 ${
                            selectedTab === 'map' ? 'border-blue-500 text-blue-500 bg-blue-100' 
                            : 'text-gray-500 hover:text-blue-500 hover:border-blue-300'
                        }`}
                        >
                            Map
                        </button>
                        <button onClick={() => setSelectedTab('comparison')}
                            className={`flex-1 px-4 py-2 text-center transition duration-300 rounded-t-md border-b-4 border-l-2 border-r-2 ${
                            selectedTab === 'comparison' ? 'border-blue-500 text-blue-500 bg-blue-100' 
                            : 'text-gray-500 hover:text-blue-500 hover:border-blue-300'
                        }`}
                        >
                            Compare
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 border border-t-0 border-gray-200 shadow-md rounded-b-lg">
                    {selectedTab === 'countries' && <CountryList />}
                    {selectedTab === 'charts' && <ChartsTab countries={countries} />}
                    {selectedTab === 'map' && <CountriesMapTab countries={countries} />}
                    {selectedTab === 'comparison' && <ComparisonTab countries={countries.slice().sort((a, b) => a.name.localeCompare(b.name))} />}
                </div>
            </div>  
        </div>
    </ErrorBoundary>    
  );
};

export default HomePage;