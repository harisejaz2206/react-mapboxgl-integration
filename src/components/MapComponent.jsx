// src/components/MapComponent.js
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setlatitude] = useState("");
  const [coordinates, setCoordinates] = useState({
    longitude: -74.006,
    latitude: 40.7128,
  });

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 12,
      });

      return () => map.remove();
    }
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default MapComponent;
