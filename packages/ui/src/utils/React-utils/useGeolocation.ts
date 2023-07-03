import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [state, setState] = useState<{ lng: number; lat: number }>();

  function getLocation() {
    if (typeof window !== "undefined") {
      window.navigator.geolocation.getCurrentPosition((res) => {
        setState({ lat: res.coords.latitude, lng: res.coords.longitude });
      });
    }
  }

  useEffect(() => {
    getLocation();
  }, [typeof window]);

  return {
    lat: state?.lat,
    lng: state?.lng,
    reAsk: getLocation,
  };
};
