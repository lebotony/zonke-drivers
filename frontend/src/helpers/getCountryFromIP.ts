import axios from "axios";

/**
 * Fetches the country from the user's IP address using ipapi.co
 * Returns null if the request fails or country cannot be determined
 */
export const getCountryFromIP = async (): Promise<string | null> => {
  try {
    const response = await axios.get("https://ipapi.co/json/", {
      timeout: 5000,
    });

    if (response.data?.country_name) {
      return response.data.country_name;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch country from IP:", error);
    return null;
  }
};
