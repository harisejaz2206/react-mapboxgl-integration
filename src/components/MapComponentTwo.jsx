/**
 * MapComponent displays a Mapbox map with the following features:
 * - Symbol Layer: Shows points (e.g., markers) on the map with custom icons and labels.
 * - Line Layer: Displays paths or routes between points with customizable styles.
 *
 * The map is centered around a specified location, and the points and paths
 * are defined using GeoJSON sources. The `symbol` layer is used for markers
 * with text labels, while the `line` layer is used for drawing lines with
 * specified colors, widths, and dash patterns.
 */

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

const MapComponentTwo = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [74.30898579319462, 31.47069819936512],
        zoom: 14,
      });

      newMap.on("load", () => {
        // Add Symbol Layer (for points)
        newMap.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [74.30898579319462, 31.47069819936512], // Coordinates for a point
                },
                properties: {
                  title: "Gourmet Restaurant",
                },
              },
              // Add more points as needed
            ],
          },
        });

        newMap.addLayer({
          id: "point-layer",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "marker-15", // Use Mapbox's built-in marker icon
            "text-field": "{title}", // Display title as text
            "text-offset": [0, 1.5],
            "text-anchor": "top",
          },
        });

        // Add Line Layer (for paths)
        newMap.addSource("paths", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [74.30898579319462, 31.47069819936512], // Start point
                    [74.31, 31.472], // End point
                  ],
                },
                properties: {
                  name: "Warehouse Path",
                },
              },
              // Add more lines as needed
            ],
          },
        });

        newMap.addLayer({
          id: "line-layer",
          type: "line",
          source: "paths",
          layout: {},
          paint: {
            "line-color": "#FF0000", // Line color
            "line-width": 4, // Line width
            "line-dasharray": [2, 2], // Optional: Dash pattern for the line
          },
        });
      });

      setMap(newMap);

      return () => newMap.remove(); // Clean up on component unmount
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

export default MapComponentTwo;
