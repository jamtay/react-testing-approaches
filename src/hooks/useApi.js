import { useEffect, useState } from "react";

/**
 * Custom hook for fetching data
 * @param url to fetch data from
 * @return {[data, loading, error]}
 */
export const useApi = url => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        setData(await response.json());
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, [url]);

  return [data, loading, error];
};
