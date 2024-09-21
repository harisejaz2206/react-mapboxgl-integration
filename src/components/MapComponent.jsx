/**
 * MapComponent renders an interactive Mapbox map that:
 * - Initializes with a default view centered on Lahore, Pakistan.
 * - Allows users to dynamically update the map's center based on latitude and longitude input.
 * - Displays a polygon representing a warehouse zone and markers for inbound and outbound areas.
 * - Updates the map center and content based on user input and component state.
 * - Cleans up the Mapbox instance when the component unmounts.
 */


import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const [coordinates, setCoordinates] = useState({
    longitude: 74.30898579319462, // Initial coordinates for Lahore
    latitude: 31.47069819936512,
  });

  const handleInputChange = (e, type) => {
    const value = parseFloat(e.target.value);
    setCoordinates((prev) => ({
      ...prev,
      [type]: value, // Dynamically update either latitude or longitude based on input type
    }));
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 14,
      });

      // Add polygon and markers to the map
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
                      [74.3079, 31.47], // Lower-left corner (southwest)
                      [74.31, 31.47], // Lower-right corner (southeast)
                      [74.31, 31.4715], // Upper-right corner (northeast)
                      [74.3079, 31.4715], // Upper-left corner (northwest)
                      [74.3079, 31.47], // Closing the polygon (back to southwest)
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
        // Add Markers (for inbound/outbound areas near Gourmet Restaurant)
        new mapboxgl.Marker({ color: "green" })
          .setLngLat([74.309, 31.4708]) // Inbound near Gourmet
          .setPopup(new mapboxgl.Popup().setText("Inbound Area"))
          .addTo(newMap);

        new mapboxgl.Marker({ color: "red" })
          .setLngLat([74.3095, 31.4712]) // Outbound near Gourmet
          .setPopup(new mapboxgl.Popup().setText("Outbound Area"))
          .addTo(newMap);
      });

      setMap(newMap);

      return () => newMap.remove();
    }
  }, [coordinates]);

  useEffect(() => {
    if (map) {
      // Update the map center whenever coordinates change
      map.setCenter([coordinates.longitude, coordinates.latitude]);
    }
  }, [coordinates, map]);

  return (
    <div>
      <div className="flex gap-6 p-6">
        <input
          type="text"
          placeholder="Enter latitude"
          onChange={(e) => handleInputChange(e, "latitude")}
          className="border border-gray-300 rounded-lg p-2 m-2 w-full max-w-xs focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Enter longitude"
          onChange={(e) => handleInputChange(e, "longitude")}
          className="border border-gray-300 rounded-lg p-2 m-2 w-full max-w-xs focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{ width: "100%", height: "100vh" }}
      />
    </div>
  );
};

export default MapComponent;
