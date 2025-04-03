import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Fix missing marker icon issue in Leaflet (only for React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom hook to update map center
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const CurrentLocationMap = ({ newRide }) => {
  const [position, setPosition] = useState([0, 0]); // Default to [0, 0] to avoid errors
  const [pickUpPosition, setPickUpPosition] = useState(null); // Separate state for pickUp location

  useEffect(() => {
    // Function to fetch coordinates for the pickUp location
    const getCoordinates = async () => {
      try {
        const response = await axios.get(`/api/maps/get-coordinates`, {
          params: { address: newRide?.pickUp },
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setPickUpPosition([response.data.lat, response.data.lng]); // Update pickUp position
      } catch (error) {
        console.error("Error fetching pickUp coordinates:", error);
      }
    };

    // Function to update the user's current location
    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]); // Update current position
          console.log("location updated on map:", latitude, longitude);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    };

    // If pickUp is provided, fetch its coordinates
    if (newRide) {
      getCoordinates();
    } else {
      // Otherwise, update the user's current location
      updateLocation();
      const intervalId = setInterval(updateLocation, 10000); // Update every 10 seconds
      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [newRide]); // Re-run effect when pickUp changes

  return (
    <MapContainer center={position} zoom={16} zoomControl={false} className="h-full w-full">
      <ChangeView center={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ZoomControl position="bottomleft" />

      {/* Marker for Current Location */}
      <Marker position={position}>
        <Popup>Your Current Location</Popup>
      </Marker>

      {/* Marker for PickUp Location */}
      {pickUpPosition && (
        <Marker position={pickUpPosition}>
          {newRide ? <Popup>PickUp Location: {newRide.pickUp}</Popup>:
          <Popup>Your location</Popup>}
          
        </Marker>
      )}
    </MapContainer>
  );
};

export default CurrentLocationMap;