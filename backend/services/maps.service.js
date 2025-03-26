import axios from "axios";

const apiKey = process.env.GO_MAPS_API_KEY;   

export const coordinatesFunc = async (address) => {
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    // Check if the API returned a valid response
    if (data.status === "OK") {
      // Extract the location from the response
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    }
    throw new Error(
      `Geocoding API error: ${data.status || "No results found"}`
    );
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error(
      error.response?.data?.error_message ||
        "Unable to fetch coordinates for the given address."
    );
  }
};

export const distanceTimeFunc = async (origin, destination) => {
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    // Check if the API returned a valid response
    if (data.status === "OK") {
      if (data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found! ");
      }
      return data.rows[0].elements[0];
    }
    throw new Error(
      `Geocoding API error: ${
        data.status || "Unable to fetch distance and time"
      }`
    );
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error(
      error.response?.data?.error_message ||
        "Unable to calculate distance and time. Please check the origin and destination addresses."
    );
  }
};

export const suggestionFunc = async (input) => {
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.status === "OK") {
      return data.predictions;
    }
    throw new Error("Unable to get suggestions");
  } catch (error) {
    console.error(error);
    throw new Error("Internal server Error");
  }
};
