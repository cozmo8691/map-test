import React from "react";
import styles from "./styles/DateInputs.module.css";

const DateInputs = ({
  label,
  value,
  dateKey,
  handleDateChange,
  placeholder,
}) => {
  return (
    <div className={styles[dateKey]}>
      <fieldset>
        <label className={styles.dateInputsFieldsetLabel}>{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => handleDateChange(dateKey, e.target.value)}
          placeholder={placeholder}
        />
      </fieldset>
    </div>
  );
};

export default DateInputs;
