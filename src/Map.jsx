import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map() {
  const [position, setPosition] = useState([17.3850, 78.4867]); // Default Hyderabad
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setHasLocation(true);
        },
        (err) => {
          console.warn("Geolocation error, using default Hyderabad location:", err);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  return (
    <MapContainer
      key={`${position[0]}-${position[1]}`} // Force map re-mount when geolocation updates
      center={position}
      zoom={hasLocation ? 15 : 13}
      style={{ height: "550px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{hasLocation ? "Your Real Location" : "Hyderabad (Default)"}</Popup>
      </Marker>
    </MapContainer>
  );
}
