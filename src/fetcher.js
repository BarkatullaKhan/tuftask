
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const useBanner = () => {
  // const response = await fetch(`http://localhost:8080/bannerData`);
  const { data, error, isLoading } = useSWR(
    process.env.REACT_APP_API_BANNER_DATA,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
};

export default useBanner;