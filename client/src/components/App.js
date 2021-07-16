import React, { useCallback, useState } from "react";
import axios from "axios";
import Map from "./Map";
import ERLogo from "../assets/ERLogo02.svg";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { AppContext } from "./contextLib";
import { formatDate, sleep } from "../util";
import styles from "./styles/App.module.css";

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("8260001");
  const [fromDate, setFromDate] = useState({
    day: "01",
    month: "01",
    year: "2019",
  });
  const [toDate, setToDate] = useState({
    day: "10",
    month: "01",
    year: "2019",
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowHeatmap, setIsShowHeatmap] = useState(false);

  const performSearch = useCallback(() => {
    const performSearch = async () => {
      const from = formatDate(fromDate);
      const to = formatDate(toDate);

      await sleep(1000); // simulate network latency

      try {
        const { data } = await axios.get(
          `http://localhost:4000/equines/${searchTerm}/?from=${from}&to=${to}`
        );
        setData(data);
      } catch (error) {
        // todo: error handling
      } finally {
        setIsLoading(false);
      }
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

  const mapPinDefault = "material-icons-outlined marker";
  const mapPinHighlight = "material-icons red marker";

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <img
          src={ERLogo}
          className="App-logo"
          alt="Equine Register"
          onClick={resetSearch}
        />
        <AppContext.Provider
          value={{
            searchTerm,
            setSearchTerm,
            fromDate,
            toDate,
            data,
            currentLocation,
            setCurrentLocation,
            mapPinDefault,
            mapPinHighlight,
            handleFromDateChange,
            handleToDateChange,
            handleSearchClick,
            isLoading,
            isShowHeatmap,
            setIsShowHeatmap,
          }}>
          {data ? <SearchResults /> : <SearchForm />}
        </AppContext.Provider>
      </div>
      <div className="map-container">
        <Map
          data={data}
          currentLocation={currentLocation}
          mapPinDefault={mapPinDefault}
          mapPinHighlight={mapPinHighlight}
          isShowHeatmap={isShowHeatmap}
        />
      </div>
    </div>
  );
}

export default App;
