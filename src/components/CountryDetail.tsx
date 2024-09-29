import React from 'react';
//import { useParams } from 'react-router-dom';
import { getCountryByCode } from '../services/CountryService';
import Loader from './Loader'; 
import { useFetch } from '../utils/useFetch';

interface CountryDetailProps {
  code: string;
}

//Details of a country shown in a model. Can also be shown in a page.
const CountryDetail: React.FC<CountryDetailProps> = ({ code }) => {
  //const { code } = useParams<{ code: string }>();
  //const [country, setCountry] = useState<any>(null);
  const { data: country, loading, error } = useFetch(getCountryByCode, code);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  if (!country) {
    return <div>No related country found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mt-4 mb-4">{country.name}</h2>
      <img className="w-full h-64 object-cover rounded mb-4" src={country.flags.svg} alt={`Flag of ${country.name}`} />
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> {Object.values(country.currencies).map((currency: any) => currency.name).join(', ')}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
    </div>
  );
};

export default CountryDetail;