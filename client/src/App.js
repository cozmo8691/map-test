import React, { useCallback, useState } from "react";
import axios from "axios";
import Map from "./Map";
import ERLogo from "./ERLogo.svg";
import { formatDate } from "./util/formatDates";

const dateTemplate = { day: "", month: "", year: "" };

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState(dateTemplate);
  const [toDate, setToDate] = useState(dateTemplate);

  const performSearch = useCallback(() => {
    const performSearch = async () => {
      // todo: add try catch
      const from = formatDate(fromDate);
      const to = formatDate(toDate);

      console.log(from);

      const { data } = await axios.get(
        `http://localhost:4000/equines/${searchTerm}/?from=${from}&to=${to}`
      ); // todo: extract out
      setData(data);
    };

    performSearch();
  }, [searchTerm, fromDate, toDate]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    performSearch();
  };

  const handleFromDateChange = (key, value) =>
    setFromDate({ ...fromDate, [key]: value });

  const handleToDateChange = (key, value) =>
    setToDate({ ...toDate, [key]: value });

  // console.log("fromDate:", fromDate);
  // console.log("toDate:", toDate);

  return (
    <div className="container">
      <div className="search">
        <img src={ERLogo} className="App-logo" alt="Equine Register" />
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
                    onChange={(e) => handleToDateChange("day", e.target.value)}
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
                    onChange={(e) => handleToDateChange("year", e.target.value)}
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <button onClick={handleSearchClick}>Search now</button>
        </form>
      </div>
      <div className="map-container">
        <Map data={data} />
      </div>
    </div>
  );
}

export default App;
