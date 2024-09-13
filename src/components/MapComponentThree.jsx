import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

const MapComponentThree = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [74.30898579319462, 31.47069819936512], // Initial coordinates
        zoom: 14,
      });

      // Add Symbol Layer for Warehouse Points
      newMap.on("load", () => {
        newMap.addSource("warehouse-points-source", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [74.309, 31.4708], // Loading Dock
                },
                properties: {
                  name: "Loading Dock",
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [74.3095, 31.4712], // Warehouse Entrance
                },
                properties: {
                  name: "Warehouse Entrance",
                },
              },
            ],
          },
        });

        newMap.addLayer({
          id: "warehouse-points",
          type: "symbol",
          source: "warehouse-points-source",
          layout: {
            "icon-image": "marker-15",
            "icon-size": 1.5,
            "text-field": ["get", "name"],
            "text-size": 12,
            "text-offset": [0, 1.5],
            "icon-allow-overlap": true,
          },
          paint: {
            "text-color": "#000000",
          },
        });

        // Add Line Layer for Warehouse Paths
        newMap.addSource("warehouse-paths-source", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [74.309, 31.4708], // Loading Dock
                    [74.3095, 31.4712], // Warehouse Entrance
                  ],
                },
                properties: {
                  name: "Path from Loading Dock to Entrance",
                },
              },
            ],
          },
        });

        newMap.addLayer({
          id: "warehouse-paths",
          type: "line",
          source: "warehouse-paths-source",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FF5733",
            "line-width": 4,
          },
        });
      });

      setMap(newMap);

      return () => newMap.remove();
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapComponentThree;
