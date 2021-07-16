import React from "react";
import styles from "./styles/DateInputs.module.css";
import DateInput from "./DateInput";

const DateInputs = ({
  title,
  dateObject: { day, month, year },
  handleDateChange,
}) => {
  const inputData = [
    { label: "Day", value: day, dateKey: "day", placeholder: "DD" },
    { label: "Month", value: month, dateKey: "month", placeholder: "MM" },
    {
      label: "Year",
      value: year,
      dateKey: "year",
      placeholder: "YYYY",
      className: styles.yearInput,
    },
  ];

  return (
    <div className={styles.dateInputsContainer}>
      <h2>{title}</h2>
      <div className={styles.dateInputs}>
        {inputData.map((input) => (
          <DateInput
            key={input.dateKey}
            {...input}
            handleDateChange={handleDateChange}
          />
        ))}
      </div>
    </div>
  );
};

export default DateInputs;
