import { React, useState } from 'react';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { ethers } from 'ethers';

import SkimRewards from './SkimRewards';
import DateETHToggler from './dateETHToggler'
import DateRangeInput from './DateRangeInput'
import EthInputField from './ETHInputField';
import TransactionsModal from './transactionsModal';
import { findRETHRatioByDate, calcRateIncrease, calcEquivalentAPY } from '../helper/RETHCalculations'
import { addressesToken } from '../helper/Addresses';
import { importantDates } from '../helper/ImportantDates';
import { createTransactionEntry } from '../helper/PreviousTransactions';
import { methods } from '../helper/objects'
import rETH_CONTRACT_ABI from "../ABI/rETH_ABI.json";
import CalculatedStats from './calculatedStats';

export default function Calculator(props) {

  const { chain } = useNetwork();
  let chainName = 'Ethereum'
  if (chain?.name == "Goerli") {
    chainName = chain.name
  }
  const rETH_CONTRACT_ADDRESS = addressesToken[chainName].rETH;

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const [rateIncrease, setRateIncrease] = useState(0);
  const [APY, setAPY] = useState(0);
  const [rETH, setRETH] = useState(0)  // rETH total under the users control
  const [rETHInWallet, setRETHInWallet] = useState(0)  // rETH total under the users control
  const [equivalentETH, setEquivalentETH] = useState(0)  // Equivalent ETH calculate from rETH
  const [ETHToRemain, setETHToRemain] = useState(0)  // ETH to remain after skimming
  const [rETHToSkim, setRETHToSkim] = useState(0)

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
      // console.log('rETH amount: ', rETHAmount);
      setRETHInWallet(rETHAmount);
      setRETH(rETHAmount);
      preSetRETHToSkim(calcRETHToSkimFromDate(rETHAmount, rateIncrease));
      setEquivalentETH(calcEquivalentETH(rETH, findRETHRatioByDate(dateRange.endDate, props.rETHRatios)));
    },
  })


  function preSetRETHToSkim(rETHToSkim) {
    setRETHToSkim(rETHToSkim >= 0 ? rETHToSkim : 0);
  }

  const handleRETHChange = event => {
    setRETH(event.target.value);
    if (methodChosen) {
      if (methodChosen == methods[0]) {
        preSetRETHToSkim(calcRETHToSkimFromDate(event.target.value, rateIncrease));
      } else if (methodChosen == methods[1]) {
        preSetRETHToSkim(calcRETHToSkimFromETH(event.target.value, ETHToRemain));
      }
    }
    setEquivalentETH(calcEquivalentETH(event.target.value, findRETHRatioByDate(dateRange.endDate, props.rETHRatios)));
    // console.log("Size: ", event.target.value, size)
  };

  const handleETHToRemainChange = event => {
    // console.log("in handle ETH to remain: ", event.target.value);
    setETHToRemain(event.target.value);
    preSetRETHToSkim(calcRETHToSkimFromETH(rETH, event.target.value));
    // console.log("Size: ", event.target.value, size)
  };

  const handleMethodsChange = event => {
    setMethodChosen(event);
    if (props.rETHRatios) {
      if (methodChosen) {
        if (event == methods[0]) {
          preSetRETHToSkim(calcRETHToSkimFromDate(rETH, rateIncrease));
          setEquivalentETH(calcEquivalentETH(rETH, findRETHRatioByDate(dateRange.endDate, props.rETHRatios)));

        } else if (event == methods[1]) {
          preSetRETHToSkim(calcRETHToSkimFromETH(rETH, ETHToRemain));
          setEquivalentETH(calcEquivalentETH(rETH, findRETHRatioByDate(importantDates.today, props.rETHRatios)));
        }
      }
    }
  }

  const handleDateRangeChange = (newValue) => {

    if (Date.parse(newValue.endDate) > Date.parse(importantDates.today)) {
      newValue.endDate = importantDates.today;
    }
    if (!newValue.startDate) {
      newValue.startDate = importantDates.rocketPoolStartDate;
    }
    if (!newValue.endDate) {
      newValue.endDate = importantDates.today;
    }

    const currentDate = new Date();

    const startDate = new Date(newValue.startDate);
    newValue.startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0);  // set to start of the day at that date
    if (newValue.startDate < importantDates.rocketPoolStartDate) {
      newValue.startDate = importantDates.rocketPoolStartDate;
    }

    const endDate = new Date(newValue.endDate);
    newValue.endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999); // set to the end of day on that date
    // console.log("start: ", newValue.startDate, " end: ", newValue.endDate)
    setDateRange(newValue);

    let startRatio = findRETHRatioByDate(newValue.startDate, props.rETHRatios);
    let endRatio = findRETHRatioByDate(newValue.endDate, props.rETHRatios);
    let tempRateIncrease = calcRateIncrease(startRatio, endRatio);
    setRateIncrease(tempRateIncrease);
    setAPY(calcEquivalentAPY(startRatio, endRatio));
    preSetRETHToSkim(calcRETHToSkimFromDate(rETH, tempRateIncrease));
    setEquivalentETH(calcEquivalentETH(rETH, endRatio));
  }

  function calcRETHToSkimFromDate(rETH, rateIncrease) {
    return rETH * rateIncrease / 100;
  }

  function calcRETHToSkimFromETH(rETH, ETHToRemain) {
    let ratio = findRETHRatioByDate(importantDates.today, props.rETHRatios);
    let exchangeRate = ethers.utils.formatEther(ratio.rate); // rETH/ETH exchange rate
    let rETHToSkim = (rETH * exchangeRate - ETHToRemain) / exchangeRate;
    return rETHToSkim;
  }

  function calcEquivalentETH(rETH, ratio) {
    let equivalentETH = 0;
    if (ratio?.rate) {
      equivalentETH = ethers.utils.formatEther(ratio.rate) * rETH;
    }
    return equivalentETH;
  }

  let inputField;
  if (methodChosen) {
    let inputDisabled = props.rETHRatios ? false : true;
    if (methodChosen == methods[0]) {
      inputField = <DateRangeInput dateRange={dateRange} handleDateRangeChange={handleDateRangeChange} inputDisabled={inputDisabled} />
    } else if (methodChosen == methods[1]) {
      inputField = <EthInputField ETHToRemain={ETHToRemain} handleETHToRemainChange={handleETHToRemainChange} inputDisabled={inputDisabled} />
    }
  }
  // console.log("Input Field: ", inputField, methodChosen);

  let calculatedStats = [
    { id: 1, name: 'equivalent ETH', value: equivalentETH, unit: 'ETH' }
  ]
  if (methodChosen && methodChosen == methods[0]) {
    calculatedStats.push({ id: 2, name: 'Increase', value: rateIncrease, unit: '%', additional: '(≍ ' + APY.toPrecision(3) + ' % APY)' })
  }
  calculatedStats.push({ id: 3, name: 'rETH to skim', value: rETHToSkim, unit: 'rETH' })


  let dateRangeForTransaction = dateRange;
  if (methodChosen == methods[1]) {
    dateRangeForTransaction = '-'
  }
  let transactionEntry = createTransactionEntry(dateRangeForTransaction, rETHToSkim, rETH, calcEquivalentETH(rETH - rETHToSkim, findRETHRatioByDate(dateRange.endDate, props.rETHRatios)));

  return (<div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
    <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
      <div className="px-4 py-8 sm:px-10">
        <TransactionsModal />
        <div className="mt-6">
          <DateETHToggler methodChosen={methodChosen} setMethodChosen={setMethodChosen} handleMethodsChange={handleMethodsChange} />
        </div>
        <div className="mt-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="rETH" className="block text-sm leading-6 text-gray-900">
                rETH to calculate the skim amount from:
              </label>
              <input
                value={rETH}
                onChange={handleRETHChange}
                type="number"
                name="rETH"
                id="rETH"
                placeholder="rETH"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5"
              />
            </div>
            {inputField}
            <CalculatedStats calculatedStats={calculatedStats} />
            <SkimRewards rETHToSkim={rETHToSkim} rETHInWallet={rETHInWallet} transactionEntry={transactionEntry} />
          </div>
        </div>
      </div>
    </div>
  </div>)
}