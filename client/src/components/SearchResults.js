import React from "react";
import { formatDate } from "../util";

const SearchResults = ({
  searchTerm,
  fromDate,
  toDate,
  data,
  setCurrentLocation,
  currentLocation,
  mapPinDefault,
  mapPinHighlight,
}) => {
  return (
    <div className="search-results">
      <div className="toggle-display">
        <div className="btn-locations btn-selected">Locations</div>
        <div className="btn-heatmap">Heat Map</div>
      </div>
      <h2>Movement locations for UELN:</h2>
      <p className="ueln-number">{searchTerm}</p>
      <div className="search-results-dates">
        <div className="sr-date-container">
          <h3>From date:</h3>
          <p>{formatDate(fromDate)}</p>
        </div>
        <div className="sr-date-container">
          <h3>To date:</h3>
          <p>{formatDate(toDate)}</p>
        </div>
      </div>
      <ul className="location-results">
        {data.length > 0 ? (
          data.map(({ id, date_from, date_to, location: { city, county } }) => {
            return (
              <li key={id} onClick={() => setCurrentLocation(id)}>
                <span
                  className={
                    id === currentLocation ? mapPinHighlight : mapPinDefault
                  }>
                  room
                </span>
                <div>
                  <div>
                    {date_from}, {date_to}
                  </div>
                  <div>
                    {city}, {county}
                  </div>
                </div>
                <span className="material-icons-outlined md-18 arrow">
                  chevron_right
                </span>
              </li>
            );
          })
        ) : (
          <div>No results found</div>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
