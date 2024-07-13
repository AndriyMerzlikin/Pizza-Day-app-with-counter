import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      const data = await response.json();
      setData(data.data);
    } catch (e) {
      if (e.name === "AbortError") {
        console.log("Request aborted");
      } else {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, isLoading, error, fetchData };
};

export default useFetch;
