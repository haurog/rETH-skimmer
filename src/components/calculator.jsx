import { React, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';

import SkimRewards from './SkimRewards';

import Datepicker from "react-tailwindcss-datepicker";

import { findRETHRatioByDate, calcRateIncrease, calcEquivalentAPY } from '../helper/RETHCalculations'

import { addressesToken } from '../helper/Addresses';
import rETH_CONTRACT_ABI from "../ABI/rETH_ABI.json";
const rETH_CONTRACT_ADDRESS = addressesToken.rETH;



export default function Calculator(props) {
  const rocketPoolStartDate = new Date("2021-11-08T00:00:00Z")  // started on Nov 9th at midnight, but need to set 1 day earlier to be able to select the start date in the calendar
  const today = new Date();
  const startOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var tempLastMonth = new Date;  // Will be set to a date in the last month
  tempLastMonth.setDate(startOfTheMonth.getDate() - 10);  // temporary date to be sure to be in the last month
  const startOfLastMonth = new Date(tempLastMonth.getFullYear(), tempLastMonth.getMonth(), 1);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const [rateIncrease, setRateIncrease] = useState(0);
  const [APY, setAPY] = useState(0);
  const [rETH, setRETH] = useState(0)  // rETH total under the users control
  const [equivalentETH, setEquivalentRETH] = useState(0)  // rETH total under the users control
  const [rETHtoSkim, setRETHToSkim] = useState(0)

  const { address, connector, isConnected } = useAccount()

  const contractRead = useContractRead({
    address: rETH_CONTRACT_ADDRESS,
    abi: rETH_CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: false,
    onSuccess(data) {
      let rETHAmount = ethers.utils.formatEther(data.toString());
      console.log('rETH amount: ', rETHAmount);
      setRETH(rETHAmount);
      setRETHToSkim(calcRETHToSkim(rETHAmount, rateIncrease));
    },
  })


  const handleRETHChange = event => {
    setRETH(event.target.value);
    setRETHToSkim(calcRETHToSkim(event.target.value, rateIncrease));
    // console.log("Size: ", event.target.value, size)
  };

  const handleDateRangeChange = (newValue) => {
    if (Date.parse(newValue.endDate) > Date.parse(today)) {
      newValue.endDate = today;
    }

    const currentDate = new Date();

    const startDate = new Date(newValue.startDate);
    newValue.startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
    const endDate = new Date(newValue.endDate);
    newValue.endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
    console.log("dateRange: ", newValue)
    setDateRange(newValue);

    let startRatio = findRETHRatioByDate(newValue.startDate, props.rETHRatios);
    let endRatio = findRETHRatioByDate(newValue.endDate, props.rETHRatios);
    let tempRateIncrease = calcRateIncrease(startRatio, endRatio);
    setRateIncrease(tempRateIncrease);
    setAPY(calcEquivalentAPY(startRatio, endRatio));
    setRETHToSkim(calcRETHToSkim(rETH, tempRateIncrease));
    setEquivalentRETH(endRatio.rate*rETH/1e18);
  }

  function calcRETHToSkim(rETH, rateIncrease) { // rate increase in %
    console.log("rETH to skim: ", rETH * rateIncrease / 100);
    return rETH * rateIncrease / 100;
  }

  console.log("APY: ", APY)
  // console.log("startOfTheMonth: ", startOfTheMonth);
  // console.log("startOfLastMonth: ", startOfLastMonth);
  // console.log("rethRatios", props.rETHRatios);

  return (<div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10">

        <div className="mt-6">
          <div className="space-y-6">
          <div>
              <label htmlFor="rETH" className="block text-sm leading-6 text-gray-900">
                rETH to calculate the skim amount from.
              </label>
              <input
                value={rETH}
                onChange={handleRETHChange}
                type="number"
                name="rETH"
                id="rETH"
                placeholder="rETH"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm leading-6 text-gray-900">
                Date range over which to calculate the rETH yield.
              </label>
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
              <h2>equivalent ETH: {equivalentETH.toPrecision(3)} rETH</h2>
            </div>
            <div>
              <h2>Increase: {rateIncrease.toPrecision(3)} % (&#8781; {APY.toPrecision(3)} % APY)</h2>
            </div>
            <div>
              <h2>rETH to skim: {rETHtoSkim.toPrecision(3)} rETH</h2>
            </div>
            <SkimRewards rETHValue={rETHtoSkim} />
          </div>
        </div>
      </div>
    </div>
  </div>)
}