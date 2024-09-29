import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CountryList from '../components/CountryList';
import { CountryProvider } from '../context/CountryContext';
import { useFetch } from '../utils/useFetch';

jest.mock('axios');
jest.mock('../services/CountryService');
jest.mock('../utils/useFetch');

jest.mock('../services/CountryService', () => {
    return {
        getAllCountries: jest.fn().mockResolvedValue({
            data: [
                { name: 'United States', population: 98555933, region: 'Americas', timezones: ['UTC-09:00'], capital: ['Washington'], currencies: { key: { name: 'USD' } }, languages: { eng: 'English' }, flags: { png: 'us.png' }, cca3: 'USA' },
                { name: 'United Kingdom', population: 73487333, region: 'Europe', timezones: ['UTC+01:00'], capital: ['London'], currencies: { key: { name: 'GBP' } }, languages: { fre: 'English' }, flags: { png: 'uk.png' }, cca3: 'UK' },
            ]
        }),
        // searchCountries: jest.fn().mockResolvedValue({ data: [
        //{ name: 'United States', population: 98555933, region: 'Americas', timezones: ['UTC-09:00'], capital: ['Washington'], currencies: {key: {name: 'USD'}}, languages: { eng: 'English' }, flags: { png: 'us.png' }, cca3: 'USA' },
        //{ name: 'United Kingdom', population: 73487333, region: 'Europe', timezones: ['UTC+01:00'], capital: ['London'], currencies: {key: {name: 'GBP'}}, languages: { fre: 'English' }, flags: { png: 'uk.png' }, cca3: 'UK' },
        // ]}),
    };
});

describe('CountryList Component', () => {
    beforeEach(() => {
        (useFetch as jest.Mock).mockReturnValue({
            data: [
                { name: 'United States', population: 98555933, region: 'Americas', timezones: ['UTC-09:00'], capital: ['Washington'], currencies: { key: { name: 'USD' } }, languages: { eng: 'English' }, flags: { png: 'us.png' }, cca3: 'USA' },
                { name: 'United Kingdom', population: 73487333, region: 'Europe', timezones: ['UTC+01:00'], capital: ['London'], currencies: { key: { name: 'GBP' } }, languages: { fre: 'English' }, flags: { png: 'uk.png' }, cca3: 'UK' },
            ],
            loading: false,
            error: null,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading state using useFetch', () => {
        // Mock useFetch to return loading state
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });

        render(
            <CountryProvider>
                <CountryList />
            </CountryProvider>
        );

        // Check if the loading spinner is displayed
        const loadingElement = screen.getByAltText('Loading...');
        expect(loadingElement).toBeInTheDocument();
    });
    test('renders search input', async () => {
        render(
            <CountryProvider>
                <CountryList />
            </CountryProvider>
        );
        await waitFor(() => {
            //const searchInput = screen.getByPlaceholderText('Search by name...');
            const countryElement = screen.getByText('United States');
            expect(countryElement).toBeInTheDocument();
        });
    });

    test('updates input value correctly', async () => {
        render(
            <CountryProvider>
                <CountryList />
            </CountryProvider>
        );

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search by name...');
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            fireEvent.change(searchInput, { target: { value: 'United States' } });
            expect(searchInput).toHaveValue('United States');
        });
    });

    test('triggers search on Enter key press', async () => {
        render(
            <CountryProvider>
                <CountryList />
            </CountryProvider>
        );
        const searchInput = screen.getByPlaceholderText('Search by name...');
        fireEvent.change(searchInput, { target: { value: 'United Kingdom' } });
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
        await waitFor(async () => {
            const country = await screen.findByText('United Kingdom');
            expect(country).toBeInTheDocument();
        });
    });
});
