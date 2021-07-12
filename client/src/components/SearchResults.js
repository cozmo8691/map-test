import React from "react";
import { useAppContext } from "./contextLib";
import { formatUELN, formatDisplayDate, formatDateObjDisplay } from "../util";

import styles from "./styles/SearchResults.module.css";

const SearchResults = () => {
  const {
    searchTerm,
    fromDate,
    toDate,
    data,
    setCurrentLocation,
    currentLocation,
    mapPinDefault,
    mapPinHighlight,
  } = useAppContext();

  return (
    <div className={styles.searchResults}>
      <div className={styles.toggleDisplay}>
        <div className={styles.btnLocationsSelected}>Locations</div>
        <div className={styles.btnHeatmap}>Heat Map</div>
      </div>
      <h2 className={styles.searchResultsHeading}>
        Movement locations for UELN:
      </h2>
      <p className={styles.uelnNumber}>{formatUELN(searchTerm)}</p>
      <div className={styles.datesOuter}>
        <div className={styles.datesContainer}>
          <h3 className={styles.datesLabel}>From date:</h3>
          <p className={styles.datesValue}>{formatDateObjDisplay(fromDate)}</p>
        </div>
        <div className={styles.datesContainer}>
          <h3 className={styles.datesLabel}>To date:</h3>
          <p className={styles.datesValue}>{formatDateObjDisplay(toDate)}</p>
        </div>
      </div>
      <ul className={styles.locationResults}>
        {data.length > 0 ? (
          data.map(({ id, date_from, date_to, location: { city, county } }) => {
            return (
              <li
                key={id}
                onClick={() => setCurrentLocation(id)}
                className={styles.resultItem}>
                <span
                  className={
                    id === currentLocation ? mapPinHighlight : mapPinDefault
                  }>
                  room
                </span>
                <div className={styles.resultItemWrapper}>
                  <div>
                    {formatDisplayDate(date_from)} to{" "}
                    {formatDisplayDate(date_to)}
                  </div>
                  <div className={styles.location}>
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
