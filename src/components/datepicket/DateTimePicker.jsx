import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <h1>Date and Time Picker</h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
      />
    </div>
  );
};

export default DateTimePicker;
