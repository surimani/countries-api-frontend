import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

//Call various HTTP Api methods dynamically via a Service
export function useFetch<T>(fetchFunction: (...args: any[]) => Promise<AxiosResponse<T>>, ...args: any[]): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const depArgs = JSON.stringify(args); 
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchFunction(...args).then((response) => {
        setData(response.data);
        setLoading(false);
    }).catch((error) => {
        console.log(error);
        setError(error.response.data.message || error.response.data.error || error.message || 'An error occurred while fetching data.');
        setLoading(false);
    });
  }, [depArgs]);

  return { data, loading, error };
};
