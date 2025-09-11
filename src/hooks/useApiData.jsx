import axios from "axios";
import { useEffect, useState } from "react";

export function useApiData(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint, { signal: controller.signal });
        setData(Array.isArray(data) ? [...data] : []);

      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching data:", err);
        setError(err);
        setData(null);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return { data, error };
}
