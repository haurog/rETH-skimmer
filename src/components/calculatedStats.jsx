// import React, { useEffect, useState } from 'react';

import { findRETHRatioByDate, calcRateIncrease, calcEquivalentAPY } from '../helper/RETHCalculations'

export default function CalculatedStats(props) {

  let Increase1D = 0;
  let Increase1W = 0;
  let Increase1M = 0;
  let Increase1Y = 0;
  let APY1D = 0;
  let APY1W = 0;
  let APY1M = 0;
  let APY1Y = 0;

  function calcAPYs() {
    if (!props.rETHRatios) {
      // console.log("in if: ", props.rETHRatios)
      return
    }

    const dateNow = new Date();
    const date1D = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
    const date1W = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
    const date1M = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
    const date1Y = new Date(dateNow.getFullYear() - 1, dateNow.getMonth(), dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());

    // console.log(dateNow, date1D, date1W, date1M, date1Y);

    const ratioNow = findRETHRatioByDate(dateNow, props.rETHRatios);
    const ratio1D = findRETHRatioByDate(date1D, props.rETHRatios);
    const ratio1W = findRETHRatioByDate(date1W, props.rETHRatios);
    const ratio1M = findRETHRatioByDate(date1M, props.rETHRatios);
    const ratio1Y = findRETHRatioByDate(date1Y, props.rETHRatios);

    Increase1D = calcRateIncrease(ratio1D, ratioNow);
    Increase1W = calcRateIncrease(ratio1W, ratioNow);
    Increase1M = calcRateIncrease(ratio1M, ratioNow);
    Increase1Y = calcRateIncrease(ratio1Y, ratioNow);

    APY1D = calcEquivalentAPY(ratio1D, ratioNow);
    APY1W = calcEquivalentAPY(ratio1W, ratioNow);
    APY1M = calcEquivalentAPY(ratio1M, ratioNow);
    APY1Y = calcEquivalentAPY(ratio1Y, ratioNow);
  }

  { calcAPYs() }

  const stats = [
    { id: 1, name: 'since Yesterday', increase: Increase1D.toPrecision(3), apy: APY1D.toPrecision(3) },
    { id: 2, name: 'since last week', increase: Increase1W.toPrecision(3), apy: APY1W.toPrecision(3) },
    { id: 3, name: 'since a month ago', increase: Increase1M.toPrecision(3), apy: APY1M.toPrecision(3) },
    { id: 4, name: 'for the last year', increase: Increase1Y.toPrecision(3), apy: APY1Y.toPrecision(3) },
  ]

  return (
    <div>
      <div className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">rETH APY over different time spans:</h2>
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.increase} %</dd>
                  <dt className="text-sm font-semibold leading-6 text-gray-300">&#8781; {stat.apy} % APY</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}