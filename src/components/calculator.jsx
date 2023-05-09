import React, { useContext, useState, useEffect } from 'react';
import SkimRewards from './SkimRewards';

export default function Calculator() {

  const [size, setSize] = useState(0)  // in MB
  const [impressions, setImpressions] = useState(0)
  const [gridEmissionPerkWhInkg, setGridEmissionPerkWhInkg] = useState(0);

  const handleSizeChange = event => {
    setSize(event.target.value);
    // console.log("Size: ", event.target.value, size)
  };

  const handleImpressionsChange = event => {
    setImpressions(event.target.value);
    // console.log("Impressions: ", event.target.value, impressions)
  };

  const handleGridEmissionChange = event => {
    setGridEmissionPerkWhInkg(event);
    // console.log("Grid emission: ", event, gridEmissionPerkWhInkg)
  };


  return (<div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10">

        <div className="mt-6">
          <div className="space-y-6">
            <div>

              <label htmlFor="startDate" className="sr-only">
                Start date:
              </label>
              <input
                onChange={handleSizeChange}
                type="number"
                name="start"
                id="start"
                placeholder="Start Date"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="impressions" className="sr-only">
                End Date:
              </label>
              <input
                onChange={handleImpressionsChange}
                type="number"
                name="impressions"
                id="end"
                placeholder="End Date"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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