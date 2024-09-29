import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create an axios instance for the API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllCountries = () => {
  return apiClient.get('/countries');
};

export const getCountryByCode = (code: string) => {
  return apiClient.get(`/countries/${code}`);
};

export const getCountriesByRegion = (region: string) => {
  return apiClient.get(`/countries/region/${region}`);
};

export const searchCountries = ({
  name = '', capital = '', region = '', timezone = ''
}) => {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (capital) params.append('capital', capital);
  if (region) params.append('region', region);
  if (timezone) params.append('timezone', timezone);
  
  return apiClient.get(`/countries/search?${params.toString()}`);
};