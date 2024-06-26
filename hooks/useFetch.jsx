import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (endpoint, query) => {
  const [data, setdata] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "x-rapidapi-key": process.env.EXPO_RAPID_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };
  const fetchData = async () => {
    setisLoading(true);

    try {
      const response = await axios.request(options);
      setdata(response.data.data);
    } catch (error) {
      console.error(error);
      seterror("thete is an error");
      alert("there is an error");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    setisLoading(true);
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refresh,
  };
};
