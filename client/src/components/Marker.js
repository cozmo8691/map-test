import React from "react";

const Marker = ({ id, currentLocation, mapPinHighlight, mapPinDefault }) => (
  <span
    id={id}
    className={id === currentLocation ? mapPinHighlight : mapPinDefault}>
    room
  </span>
);

export default Marker;
