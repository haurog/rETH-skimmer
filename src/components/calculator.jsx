import React, { useContext, useState, useEffect } from 'react';
import SkimRewards from './SkimRewards';

import Datepicker from "react-tailwindcss-datepicker";


export default function Calculator() {

  const [size, setSize] = useState(0)  // in MB
  const [impressions, setImpressions] = useState(0)
  const [gridEmissionPerkWhInkg, setGridEmissionPerkWhInkg] = useState(0);

  const rocketPoolStartDate = new Date("2021-11-7")  // started on Nov 8th, but need to set 1 day earlier for calendar to work
  const today = new Date();

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    if (Date.parse(newValue.endDate) > Date.parse(today)) {
      newValue.endDate = today;
    }
    setValue(newValue);
  }

  console.log("value: ", value)

  return (<div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10">

        <div className="mt-6">
          <div className="space-y-6">
            <div>
              <Datepicker
                primaryColor={"orange"}
                minDate={rocketPoolStartDate}
                maxDate={today}
                // startWeekOn="mon"
                value={value}
                onChange={handleValueChange}
                showShortcuts={true}
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