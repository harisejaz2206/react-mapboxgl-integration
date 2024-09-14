// Working on custom sprites

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

// GeoJSON data for Forklift
const forkliftData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [74.30908579319462, 31.47089819936512], // Example forklift coordinates
      },
      properties: {},
    },
  ],
};

// GeoJSON data for RFID Scanner
const rfidScannerData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [74.30918579319462, 31.47099819936512], // Example RFID scanner coordinates
      },
      properties: {},
    },
  ],
};

const MapComponentFour = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [74.30898579319462, 31.47069819936512], // Initial coordinates
        zoom: 14,
      });

      newMap.on("load", () => {
        // Add Forklift Source
        newMap.addSource("forklift-source", {
          type: "geojson",
          data: forkliftData, // Reference the separate forklift data object
        });

        // Add RFID Scanner Source
        newMap.addSource("rfid-scanner-source", {
          type: "geojson",
          data: rfidScannerData, // Reference the separate RFID scanner data object
        });

        // Load Forklift Icon and Add Symbol Layer
        newMap.loadImage(
          "https://cdn-icons-png.flaticon.com/512/870/870055.png", // Forklift icon URL
          (error, image) => {
            if (error) throw error;
            newMap.addImage("forklift-icon", image);

            newMap.addLayer({
              id: "forklift-layer",
              type: "symbol",
              source: "forklift-source",
              layout: {
                "icon-image": "forklift-icon",
                "icon-size": 0.05,
                "icon-allow-overlap": true,
              },
            });
          }
        );

        // Load RFID Scanner Icon and Add Symbol Layer
        newMap.loadImage(
          "https://atlas-content-cdn.pixelsquid.com/assets_v2/308/3083641623855240558/jpeg-600/G03.jpg?modifiedAt=1", // Replace with your RFID scanner icon URL
          (error, image) => {
            if (error) throw error;
            newMap.addImage("rfid-scanner-icon", image);

            newMap.addLayer({
              id: "rfid-scanner-layer",
              type: "symbol",
              source: "rfid-scanner-source",
              layout: {
                "icon-image": "rfid-scanner-icon",
                "icon-size": 0.05,
                "icon-allow-overlap": true,
              },
            });
          }
        );
      });

      setMap(newMap);

      return () => newMap.remove();
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapComponentFour;
