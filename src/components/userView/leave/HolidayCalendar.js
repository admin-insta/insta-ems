import React from "react";
import "./HolidayCalendar.css";
import Card from "../../utils/theme/Cards";

const holidays = {
  April: ["Good Friday - 7th April"],
  May: ["Labor Day - 1st May"],
  June: [],
  July: [],
  August: ["Independence Day - 15th August"],
  September: [],
  October: ["Gandhi Jayanti - 2nd October", "Diwali - 24th October"],
  November: ["Guru Nanak Jayanti - 8th November"],
  December: ["Christmas - 25th December"],
  January: ["New Year - 1st January", "Republic Day - 26th January"],
  February: [],
  March: ["Holi - 8th March"],
};

const HolidayCalendar = () => {
  return (
    <Card
      variant="primary"
      title={<div>Holiday Calendar (Financial Year)</div>}
      description={
        <div>
          <div className="calendar-grid">
            {Object.entries(holidays).map(([month, days]) => (
              <div key={month} className="month-box">
                <h3>{month}</h3>
                {days.length > 0 ? (
                  <ul>
                    {days.map((holiday, index) => (
                      <li key={index}>{holiday}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No Holidays</p>
                )}
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default HolidayCalendar;
