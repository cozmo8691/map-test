import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Marker from "./Marker";
import User from "./User";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100%",
  height: "100%",
};

const MapboxGLMap = ({
  data,
  currentLocation,
  mapPinDefault,
  mapPinHighlight,
}) => {
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

    currentMarkers.current = [];

    const markers = data.map((result) => {
      const {
        id,
        location: { lat, long, city, county },
      } = result;

      const markerNode = document.createElement("div");
      ReactDOM.render(
        <Marker
          id={id}
          currentLocation={currentLocation}
          mapPinDefault={mapPinDefault}
          mapPinHighlight={mapPinHighlight}
        />,
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
  }, [data, isMapLoaded, map, currentLocation, mapPinDefault, mapPinHighlight]);

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
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }
  }, [map]);

  return (
    <div ref={(el) => (mapContainer.current = el)} style={styles}>
      <User />
    </div>
  );
};

export default MapboxGLMap;
