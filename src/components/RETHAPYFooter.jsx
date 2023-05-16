// import React, { useEffect, useState } from 'react';

import {findRETHRatioByDate, calcRateIncrease} from '../helper/RETHCalculations'

export default function RETHAPYFooter(props) {

    let APY1D = 0;
    let APY1W = 0;
    let APY1M = 0;
    let APY1Y = 0;

    function calcAPYs() {
        if (!props.rETHRatios) {
            console.log("in if: ", props.rETHRatios)
            return
        }

        const dateNow = new Date();
        const date1D = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
        const date1W = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
        const date1M = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
        const date1Y = new Date(dateNow.getFullYear() - 1, dateNow.getMonth(), dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());

        const ratioNow = findRETHRatioByDate(dateNow, props.rETHRatios);
        const ratio1D = findRETHRatioByDate(date1D, props.rETHRatios);
        const ratio1W = findRETHRatioByDate(date1W, props.rETHRatios);
        const ratio1M = findRETHRatioByDate(date1M, props.rETHRatios);
        const ratio1Y = findRETHRatioByDate(date1Y, props.rETHRatios);

        APY1D = calcRateIncrease(ratio1D, ratioNow);
        APY1W = calcRateIncrease(ratio1W, ratioNow);
        APY1M = calcRateIncrease(ratio1M, ratioNow);
        APY1Y = calcRateIncrease(ratio1Y, ratioNow);
    }

    { calcAPYs() }

    return (
        <div>
            <div className="mx-auto max-w-7xl py-8 px-4 sm:py-10 sm:px-6 lg:px-8 lg:py-5">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
                        APY of rETH over different time spans:
                    </h2>
                </div>

                <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
                    <div className="flex flex-col">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-300">since Yesterday</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-gray-300">{APY1D.toPrecision(3)}</dd>
                    </div>
                    <div className="mt-10 flex flex-col sm:mt-0">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-300">since last week</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-gray-300">{APY1W.toPrecision(3)}</dd>
                    </div>
                    <div className="mt-10 flex flex-col sm:mt-0">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-300">since a month ago</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-gray-300">{APY1M.toPrecision(3)}</dd>
                    </div>
                    <div className="mt-10 flex flex-col sm:mt-0">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-300">for the last year</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-gray-300">{APY1Y.toPrecision(3)}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}







