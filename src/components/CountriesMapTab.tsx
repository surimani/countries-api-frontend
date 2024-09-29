import React, { useState, useEffect } from 'react';
import MapofCountries from './MapofCountries';
import Loader from './Loader'; 

interface MapTabProps {
  countries: any[];
}

//Tab to show all the countries in Map and has markers to show details of each country
const CountriesMapTab: React.FC<MapTabProps> = ({ countries }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
        <h2 className="text-xl font-semibold mb-4">All Countries Map</h2>
        <div className="h-auto">
            <MapofCountries countries={countries} />
        </div>
        </div>
    );
};

export default CountriesMapTab;