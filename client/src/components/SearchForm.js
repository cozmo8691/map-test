import React from "react";

import DateInputs from "./DateInputs";

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  handleSearchClick,
  isLoading,
}) => {
  return (
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
        <DateInputs
          title="From date"
          dateObject={fromDate}
          handleDateChange={handleFromDateChange}
        />

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
                onChange={(e) => handleToDateChange("month", e.target.value)}
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
  );
};

export default SearchForm;
