// src/components/MapComponent.js
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude], // Replace with your initial coordinates
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
