import React from "react";

const DateInputs = ({
  title,
  dateObject: { day, month, year },
  handleDateChange,
}) => {
  return (
    <div className="date-inputs-container">
      <h2>{title}</h2>
      <div className="date-inputs">
        <fieldset>
          <label>Day</label>
          <input
            type="text"
            value={day}
            onChange={(e) => handleDateChange("day", e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Month</label>
          <input
            type="text"
            value={month}
            onChange={(e) => handleDateChange("month", e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => handleDateChange("year", e.target.value)}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default DateInputs;
