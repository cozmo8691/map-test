import React from "react";
import DateInputs from "./DateInputs";
import styles from "./styles/SearchForm.module.css";

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
    <form className={styles.searchForm}>
      <fieldset className={styles.uelnNumber}>
        <label>Enter UELN, Passport or Microchip Number</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.uelnNumberInput}
        />
      </fieldset>
      <div>
        <h2>Enter search date range</h2>
        <p>Enter the date range to search between</p>
      </div>
      <div className={styles.dateContainer}>
        <DateInputs
          title="From date"
          dateObject={fromDate}
          handleDateChange={handleFromDateChange}
        />
        <DateInputs
          title="To date"
          dateObject={toDate}
          handleDateChange={handleToDateChange}
        />
      </div>

      <button onClick={handleSearchClick} className={styles.formButton}>
        {isLoading ? (
          <div className={styles.spinner} />
        ) : (
          <>
            Search now{" "}
            <span className="material-icons-outlined md-18">chevron_right</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;
