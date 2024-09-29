import React, { createContext, ReactNode } from 'react';
import { getAllCountries } from '../services/CountryService';
import { useFetch } from '../utils/useFetch';
import Loader from '../components/Loader'; 

interface CountryContextProps {
  countries: any[];
  availableTimeZones: any[];
}

const CountryContext = createContext<CountryContextProps | undefined>(undefined);

//Context Provider
const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: countries, loading, error } = useFetch(getAllCountries);
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  const availableTimeZones = Array.from(new Set<string>(countries.flatMap((country: { timezones: string | string[]; }) => country.timezones))).sort();
  return (
    <CountryContext.Provider value={{ countries, availableTimeZones }}>
      {children}
    </CountryContext.Provider>
  );
};

//Import and use this context in other places
const useCountryContext = () => {
    const context = React.useContext(CountryContext);
    if (!context) {
      throw new Error('Error while using useCountryContext');
    }
    return context;
};

export { CountryProvider, useCountryContext };