import { React, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';

import SkimRewards from './SkimRewards';
import DateETHToggler from './dateETHToggler'
import DateRangeInput from './DateRangeInput'
import EthInputField from './ETHInputField';
import { findRETHRatioByDate, calcRateIncrease, calcEquivalentAPY } from '../helper/RETHCalculations'
import { addressesToken } from '../helper/Addresses';
import rETH_CONTRACT_ABI from "../ABI/rETH_ABI.json";

const rETH_CONTRACT_ADDRESS = addressesToken.rETH;

export default function Calculator(props) {

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const [rateIncrease, setRateIncrease] = useState(0);
  const [APY, setAPY] = useState(0);
  const [rETH, setRETH] = useState(0)  // rETH total under the users control
  const [equivalentETH, setEquivalentRETH] = useState(0)  // Equivalent ETH calculate from rETH
  const [ETHToRemain, setETHToRemain] = useState(0)  // ETH to remain after skimming
  const [rETHtoSkim, setRETHToSkim] = useState(0)

  const [methodChosen, setMethodChosen] = useState() // to set calculation method (date, ETH) by child component

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
      setRETHToSkim(calcRETHToSkimFromDate(rETHAmount, rateIncrease));
    },
  })

  const handleRETHChange = event => {
    setRETH(event.target.value);
    if (methodChosen.name == 'by date') {
      setRETHToSkim(calcRETHToSkimFromDate(event.target.value, rateIncrease));
    } else if (methodChosen.name == 'by remaining ETH') {
      setRETHToSkim(calcRETHToSkimFromETH(event.target.value, ETHToRemain));
    }

    // console.log("Size: ", event.target.value, size)
  };

  const handleETHToRemainChange = event => {
    console.log("in handle ETH to remain: ", event.target.value);
    setETHToRemain(event.target.value);
    setRETHToSkim(calcRETHToSkimFromETH(rETH, event.target.value));
    // console.log("Size: ", event.target.value, size)
  };

  const handleDateRangeChange = (newValue) => {
    const today = new Date();
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
    setRETHToSkim(calcRETHToSkimFromDate(rETH, tempRateIncrease));
    setEquivalentRETH(calcEquivalentETH(rETH, endRatio));
  }

  function calcRETHToSkimFromDate(rETH, rateIncrease) {
    console.log("rETH to skim: ", rETH * rateIncrease / 100);
    return rETH * rateIncrease / 100;
  }

  function calcRETHToSkimFromETH(rETH, ETHToRemain) {
    const today = new Date();
    let ratio = findRETHRatioByDate(today, props.rETHRatios);
    // console.log("rate: ", )
    let rETHToSkim = rETH * ratio.rate / 1e18 - ETHToRemain
    // console.log("rETH to skim from remaining ETH: ", rETHToSkim, rETH, ratio.rate, ETHToRemain);
    return rETHToSkim;
  }

  function calcEquivalentETH(rETH, ratio) {
    return ratio.rate * rETH / 1e18;
  }

  console.log("APY: ", APY)
  // console.log("startOfTheMonth: ", startOfTheMonth);
  // console.log("startOfLastMonth: ", startOfLastMonth);
  // console.log("rethRatios", props.rETHRatios);
  // console.log("Method Chosen: ", methodChosen);

  let inputField;
  if (methodChosen.name == 'by date') {
    inputField = <DateRangeInput dateRange={dateRange} handleDateRangeChange={handleDateRangeChange} />
  } else if (methodChosen.name == 'by remaining ETH') {
    inputField = <EthInputField ETHToRemain={ETHToRemain} handleETHToRemainChange={handleETHToRemainChange}/>
  }
  console.log("Input Field: ", inputField, methodChosen);

  return (<div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10">
        <DateETHToggler methodChosen={methodChosen} setMethodChosen={setMethodChosen} />
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
              {inputField}
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