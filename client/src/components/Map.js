import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Marker from "./Marker";
import User from "./User";
import "mapbox-gl/dist/mapbox-gl.css";
import differenceInDays from "date-fns/differenceInDays";

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
  const [isShowHeatmap, setIsShowHeatMap] = useState(true);

  useEffect(() => {
    currentMarkers.current.forEach((marker) => {
      marker.remove();
    });

    if (!isMapLoaded || !data || isShowHeatmap) {
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
  }, [
    data,
    isMapLoaded,
    map,
    currentLocation,
    mapPinDefault,
    mapPinHighlight,
    isShowHeatmap,
  ]);

  useEffect(() => {
    if (!isMapLoaded || !data || !isShowHeatmap) {
      return;
    }

    currentMarkers.current.forEach((marker) => {
      marker.remove();
    });

    currentMarkers.current = [];

    // add a duration property to the data
    const features = data.map((d) => {
      const duration = differenceInDays(
        new Date(d.date_to),
        new Date(d.date_from)
      );

      return {
        type: "Feature",
        properties: { duration },
        geometry: {
          type: "Point",
          coordinates: [d.location.long, d.location.lat],
        },
      };
    });

    // add the source
    map.addSource("locations", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    });

    map.addLayer(
      {
        id: "locations-heat",
        type: "heatmap",
        source: "locations",
        maxzoom: 5,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "duration"],
            0,
            0,
            6,
            1,
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            9,
            3,
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
          ],
          // Adjust the heatmap radius by zoom level
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
        },
      },
      "waterway-label"
    );
  }, [data, isMapLoaded, isShowHeatmap, map]);

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
