import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

const CurrentLocationMap = () => {
  const [position, setPosition] = useState([28.7041, 77.1025]); // Default to Delhi

  useEffect(() => {
    if ("geolocation" in navigator) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition([position.coords.latitude, position.coords.longitude]);
            console.log("updated")
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      };
      updateLocation(); // initial update
      const intervalId = setInterval(updateLocation, 10000); // update every 10 sec
      return () => clearInterval(intervalId);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <MapContainer center={position} zoom={18} zoomControl={false} className="border-4 border-green-700 h-full w-full">
      <ChangeView center={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1000, // Ensure it stays above the map
        }}
      ></div>
      <ZoomControl position="bottomleft" />
      <Marker position={position}>
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CurrentLocationMap;
