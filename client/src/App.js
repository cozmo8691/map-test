import React, { useCallback, useState } from "react";
import axios from "axios";
import Map from "./Map";
import ERLogo from "./ERLogo.svg";
import { formatDate } from "./util/formatDates";

const dateFromTemplate = { day: "01", month: "01", year: "2019" };
const dateToTemplate = { day: "04", month: "01", year: "2019" };

const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("8260001");
  const [fromDate, setFromDate] = useState(dateFromTemplate);
  const [toDate, setToDate] = useState(dateToTemplate);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(() => {
    const performSearch = async () => {
      // todo: add try catch
      const from = formatDate(fromDate);
      const to = formatDate(toDate);

      await sleep(1000); // simulate network latency

      const { data } = await axios.get(
        `http://localhost:4000/equines/${searchTerm}/?from=${from}&to=${to}`
      ); // todo: extract out
      setData(data);
      setIsLoading(false);
    };

    performSearch();
  }, [searchTerm, fromDate, toDate]);

  const handleSearchClick = (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    performSearch();
  };

  const handleFromDateChange = (key, value) =>
    setFromDate({ ...fromDate, [key]: value });

  const handleToDateChange = (key, value) =>
    setToDate({ ...toDate, [key]: value });

  const resetSearch = () => {
    setData(null);
    setCurrentLocation(null);
  };

  const mapPinDefault = "material-icons-outlined";
  const mapPinHighlight = "material-icons red";

  return (
    <div className="container">
      <div className="search">
        <img
          src={ERLogo}
          className="App-logo"
          alt="Equine Register"
          onClick={resetSearch}
        />
        {data ? (
          <div className="search-results">
            <div className="toggle-display">
              <div className="btn-locations btn-selected">Locations</div>
              <div className="btn-heatmap">Heat Map</div>
            </div>
            <h2>Movement locations for UELN:</h2>
            <p>{searchTerm}</p>
            <div className="search-results-dates">
              <div>
                <h3>From date:</h3>
                <p>{formatDate(fromDate)}</p>
              </div>
              <div>
                <h3>To date:</h3>
                <p>{formatDate(toDate)}</p>
              </div>
            </div>
            <ul className="location-results">
              {data.map(
                ({ id, date_from, date_to, location: { city, county } }) => {
                  return (
                    <li key={id} onClick={() => setCurrentLocation(id)}>
                      <span
                        className={
                          id === currentLocation
                            ? mapPinHighlight
                            : mapPinDefault
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
                }
              )}
            </ul>
          </div>
        ) : (
          <form>
            <fieldset className="ueln-number">
              <label>Enter UELN, Passport or Microchip Number</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </fieldset>
            <div>
              <h2>Enter search date range</h2>
              <p>Enter the date range to search between</p>
            </div>
            <div className="date-container">
              <div className="date-inputs-container">
                <h2>From date</h2>
                <div className="date-inputs">
                  <fieldset>
                    <label>Day</label>
                    <input
                      type="text"
                      value={fromDate.day}
                      onChange={(e) =>
                        handleFromDateChange("day", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <label>Month</label>
                    <input
                      type="text"
                      value={fromDate.month}
                      onChange={(e) =>
                        handleFromDateChange("month", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <label>Year</label>
                    <input
                      type="text"
                      value={fromDate.year}
                      onChange={(e) =>
                        handleFromDateChange("year", e.target.value)
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="date-inputs-container">
                <h2>To date</h2>
                <div className="date-inputs">
                  <fieldset>
                    <label>Day</label>
                    <input
                      type="text"
                      value={toDate.day}
                      onChange={(e) =>
                        handleToDateChange("day", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <label>Month</label>
                    <input
                      type="text"
                      value={toDate.month}
                      onChange={(e) =>
                        handleToDateChange("month", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <label>Year</label>
                    <input
                      type="text"
                      value={toDate.year}
                      onChange={(e) =>
                        handleToDateChange("year", e.target.value)
                      }
                    />
                  </fieldset>
                </div>
              </div>
            </div>

            <button onClick={handleSearchClick}>
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <>
                  Search now{" "}
                  <span className="material-icons-outlined md-18 arrow">
                    chevron_right
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="map-container">
        <Map data={data} currentLocation={currentLocation} />
      </div>
    </div>
  );
}

export default App;
