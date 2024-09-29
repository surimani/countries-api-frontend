import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';

interface MapofCountriesProps {
  countries: any[];
}

//Icon shown on the map
const markerIcon = Leaflet.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 40],
    iconAnchor: [15, 40],
    popupAnchor: [1, -35],
});

//Map based visualization for countries
const MapofCountries: React.FC<MapofCountriesProps> = ({ countries }) => {
  return (
    <MapContainer center={[50, 10]} zoom={4} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countries.map((country) => (
        country.latlng && (
          <Marker key={country.cca3} position={country.latlng} icon={markerIcon}>
            <Popup>
              <div>
                <strong>{country.name}</strong>
                <img src={country.flags.png} alt={`Flag of ${country.name}`} style={{ width: '100px' }} />
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapofCountries;
