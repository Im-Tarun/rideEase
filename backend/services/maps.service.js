import axios from "axios";
import captainModel from "../models/captain.model.js"; 

const apiKey = process.env.GOOGLE_MAPS_API_KEY;   

export const coordinatesFunc = async (address) => {
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`; 

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Check if the API returned valid results
    if (data.length > 0) {
      // Extract the location from the first result
      const location = data[0];
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
      };
    }
    throw new Error("No results found");
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return [];
  }
};

export const distanceTimeFunc = async (origin, destination) => {
  // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
  //   origin
  // )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`; 
  const { lat: originLat, lng: originLng } = await coordinatesFunc(origin);
  const { lat: destinationLat, lng: destinationLng } = await coordinatesFunc(destination);
  
  const url = `https://router.project-osrm.org/table/v1/driving/${originLng},${originLat};${destinationLng},${destinationLat}?annotations=distance,duration` 

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Check if the API returned a valid response
    if (data.distances && data.durations) {
      const distance = data.distances[0][1]; // Distance from origin to destination
      const duration = data.durations[0][1]; // Duration from origin to destination

      if (distance === undefined || duration === undefined) {
        throw new Error("No routes found!");
      }

      return {
        distance,
        duration,
      };
    }

    throw new Error("Unable to fetch distance and time");
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw new Error(
      error.response?.data?.error_message ||
        "Unable to calculate distance and time. Please check the origin and destination coordinates."
    );
  }
};

export const suggestionFunc = async (input) => {
  // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
  //   input
  // )}&key=${apiKey}`;
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Check if the API returned valid results
    if (data && data.features && data.features.length > 0) {
      // Map the results to a simpler format
    const suggestions = data.features.map((elem) =>  elem.properties.name+", "+
    elem.properties.state+", "+
    elem.properties.country
    ); 
      return suggestions;
    }

    // Handle cases where no suggestions are found
    console.warn("No suggestions found for input:", input);
    return [];
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    return [];
  }
};

export const getCaptainsInRadius = async (ltd, lng, radius) => { 
  try {
    const radiusInRadians = radius / 6317;
    // Updated query using captainModel's GeoJSON location field
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radiusInRadians],
        }, 
      },
    });
    return captains;
  } catch (error) {
    console.error("Error finding captains in radius:", error.message);
    throw new Error("Unable to find captains in the specified radius.");
  }
};

