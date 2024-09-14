// Working on raster images

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg";

const MapComponentFive = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [74.3587, 31.5204], // Example: Lahore center
        zoom: 10,
      });

      newMap.on("load", () => {
        // Add raster source
        newMap.addSource("satellite-source", {
          type: "raster",
          tiles: [
            "https://api.mapbox.com/v4/mapbox.satellite/1/0/0@2x.jpg90?access_token=pk.eyJ1IjoiaGFyaXNlamF6MjIwNiIsImEiOiJjbTBucjByeG4wMHJ5MmlzZTl2eW55cXlnIn0.i3ElwGnby8QJv7WX92Kzlg",
          ],
          tileSize: 256,
        });

        // Add raster layer
        newMap.addLayer({
          id: "satellite-layer",
          type: "raster",
          source: "satellite-source",
          paint: {
            "raster-opacity": 0.1,
          },
        });
      });

      return () => newMap.remove();
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapComponentFive;
