import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { getCurrentTime } from '../utils/Util';

interface CountryCardProps {
  country: any;
}
//Card for a specific Country
const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  //const navigate = useNavigate();  
  if (!country) {
    return <p>Country is empty.</p>;
  }
//   const handleClick = () => {
//     navigate(`/country/${country.cca3}`); // Navigate to the detail page using the country's code
//   };
  const currentTime = getCurrentTime(country.timezones[0]);     
  return (
    <div className="flex-1 min-h-[200px] bg-white rounded-lg shadow-md m-4 p-4 hover:bg-blue-50 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <h5 className="font-bold text-xl mb-2">{country.name}</h5>
      <img className="w-full h-48 object-contain" src={country.flags.png} alt={`${country.name} flag`} />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">Region: {country.region}</p>
        <p className="text-gray-700 text-base">Current Time: {currentTime}</p>
      </div>
    </div>
  );
};

export default CountryCard;