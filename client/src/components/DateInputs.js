import React from "react";
import styles from "./styles/DateInputs.module.css";

const DateInputs = ({
  title,
  dateObject: { day, month, year },
  handleDateChange,
}) => {
  return (
    <div className={styles.dateInputsContainer}>
      <h2>{title}</h2>
      <div className={styles.dateInputs}>
        <fieldset className={styles.dateInputsFieldset}>
          <label>Day</label>
          <input
            type="text"
            value={day}
            onChange={(e) => handleDateChange("day", e.target.value)}
            className={styles.dateInputsInput}
          />
        </fieldset>
        <fieldset className={styles.dateInputsFieldset}>
          <label>Month</label>
          <input
            type="text"
            value={month}
            onChange={(e) => handleDateChange("month", e.target.value)}
            className={styles.dateInputsInput}
          />
        </fieldset>
        <fieldset className={styles.dateInputsFieldset}>
          <label>Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => handleDateChange("year", e.target.value)}
            className={styles.dateInputsInput}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default DateInputs;
