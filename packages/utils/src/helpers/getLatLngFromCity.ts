import axios from "axios";

const GEOCODING_API_URL = "https://api.opencagedata.com/geocode/v1/json";

export const getLatLngFromCity = async (
  city: string,
  apiKey: string,
): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        q: city,
        key: apiKey,
      },
    });

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      console.error("No results found for the city");
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
};
