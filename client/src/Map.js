import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Marker from "./components/Marker";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100%",
  height: "100%",
};

const mapPinDefault = "material-icons-outlined";
const mapPinHighlight = "material-icons red";

const MapboxGLMap = ({ data, currentLocation }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const currentMarkers = useRef([]);

  useEffect(() => {
    currentMarkers.current.forEach((marker) => {
      marker.remove();
    });

    if (!isMapLoaded || !data) {
      return;
    }
    console.log("data:", data);

    currentMarkers.current = [];
    // console.log(currentMarkers.current);

    const markers = data.map((result) => {
      const {
        id,
        location: { lat, long, city, county },
      } = result;

      // <span class="material-icons red">room</span>

      const markerNode = document.createElement("div");
      ReactDOM.render(
        <span
          id={id}
          className={id === currentLocation ? mapPinHighlight : mapPinDefault}>
          room
        </span>,
        markerNode
      );

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${city}, ${county}`
      );

      return new mapboxgl.Marker(markerNode)
        .setLngLat([long, lat])
        .setPopup(popup)
        .addTo(map);
    });

    currentMarkers.current = markers;
    console.log(currentMarkers.current);
  }, [data, isMapLoaded, map, currentLocation]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-4, 55],
        zoom: 4.5,
      });

      map.on("load", () => {
        setMap(map);
        setIsMapLoaded(true);
        // map.resize();
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
