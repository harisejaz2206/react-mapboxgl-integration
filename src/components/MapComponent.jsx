// src/components/MapComponent.js
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const [coordinates, setCoordinates] = useState({
    longitude: -74.006,
    latitude: 40.7128,
  });

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 24,
      });

      newMap.on("load", () => {
        // Add a Polygon (for warehouse zones)
        newMap.addSource("warehouse-zones", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [-74.006, 40.7128],
                      [-74.002, 40.7128],
                      [-74.002, 40.7168],
                      [-74.006, 40.7168],
                      [-74.006, 40.7128],
                    ],
                  ],
                },
                properties: {
                  name: "Zone A",
                },
              },
            ],
          },
        });

        newMap.addLayer({
          id: "zone-layer",
          type: "fill",
          source: "warehouse-zones",
          layout: {},
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.5,
          },
        });

        // Add Markers (for inbound/outbound areas)
        new mapboxgl.Marker({ color: "green" })
          .setLngLat([-74.004, 40.713])
          .setPopup(new mapboxgl.Popup().setText("Inbound Area"))
          .addTo(newMap);

        new mapboxgl.Marker({ color: "red" })
          .setLngLat([-74.005, 40.715])
          .setPopup(new mapboxgl.Popup().setText("Outbound Area"))
          .addTo(newMap);
      });

      setMap(newMap);  

      return () => newMap.remove();
    }
  }, [coordinates]);

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default MapComponent;
