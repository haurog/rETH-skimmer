import React, { useContext, useState, useEffect } from 'react';
import SkimRewards from './SkimRewards';

import Datepicker from "react-tailwindcss-datepicker";


export default function Calculator() {

  const [size, setSize] = useState(0)  // in MB
  const [impressions, setImpressions] = useState(0)
  const [gridEmissionPerkWhInkg, setGridEmissionPerkWhInkg] = useState(0);

  const rocketPoolStartDate = new Date("2021-11-7")  // started on Nov 8th, but need to set 1 day earlier for calendar to work
  const today = new Date();
  const startOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var tempLastMonth = new Date;  // Will be set to a date in the last month
  tempLastMonth.setDate(startOfTheMonth.getDate() - 10);
  const startOfLastMonth = new Date(tempLastMonth.getFullYear(), tempLastMonth.getMonth(), 1);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });


  const handleDateRangeChange = (newValue) => {
    if (Date.parse(newValue.endDate) > Date.parse(today)) {
      newValue.endDate = today;
    }
    console.log("dateRange: ", newValue)
    setDateRange(newValue);
  }

  // console.log("startOfTheMonth: ", startOfTheMonth);
  // console.log("startOfLastMonth: ", startOfLastMonth);

  return (<div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10">

        <div className="mt-6">
          <div className="space-y-6">
            <div>
              <Datepicker
                primaryColor={"orange"}
                showShortcuts={true}
                showFooter={true}
                minDate={rocketPoolStartDate}
                maxDate={today}
                startFrom={startOfLastMonth}
                configs={{
                  shortcuts: {
                    past: period => `Last ${period} days`,
                    currentMonth: "Current Month",
                    pastMonth: "Past Month"
                  }
                }}
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
            <div>
              <h2>rETH to skim: {0.0123} rETH</h2>
            </div>
            <SkimRewards value={0.0123} />
          </div>
        </div>
      </div>
    </div>
  </div>)
}