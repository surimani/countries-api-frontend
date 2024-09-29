import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ComparisonTab from '../components/ComparisonTab';

const mockCountries = [
  { name: 'United States', population: 98555933, region: 'Americas', capital: ['Washington'], currencies: {key: {name: 'USD'}}, languages: { eng: 'English' }, flags: { png: 'us.png' } },
  { name: 'United Kingdom', population: 73487333, region: 'Europe', capital: ['London'], currencies: {key: {name: 'GBP'}}, languages: { fre: 'English' }, flags: { png: 'uk.png' } },
];

describe('CountryComparison Component', () => {
  test('renders dropdowns for country selection', () => {
    render(<ComparisonTab countries={mockCountries} />);
    const dropdownOne = screen.getByLabelText('Select Country 1:');
    const dropdownTwo = screen.getByLabelText('Select Country 2:');

    expect(dropdownOne).toBeInTheDocument();
    expect(dropdownTwo).toBeInTheDocument();
  });

  test('selects countries and displays their details', () => {
    render(<ComparisonTab countries={mockCountries} />);
    const dropdownOne = screen.getByLabelText('Select Country 1:');
    const dropdownTwo = screen.getByLabelText('Select Country 2:');

    fireEvent.change(dropdownOne, { target: { value: 'United States' } });
    fireEvent.change(dropdownTwo, { target: { value: 'United Kingdom' } });

    // Check if country details are displayed
    const usPopulation = screen.getByText('9,85,55,933');
    const ukPopulation = screen.getByText('7,34,87,333');

    expect(usPopulation).toBeInTheDocument();
    expect(ukPopulation).toBeInTheDocument();
  });
});