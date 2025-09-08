import axios from "axios";
import { useEffect, useState, useRef } from "react";

export function useApiData(endpoint) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint);
        if (isMounted.current) {
          setData(Array.isArray(data) ? [...data] : []);
        }
      } catch (err) {
        if (isMounted.current) {
          console.error("Error fetching data:", err);
          setError(err);
          setData([]); 
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [endpoint]);

  return { data, error };
}