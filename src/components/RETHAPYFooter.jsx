import React, { useEffect, useState } from 'react';

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
        console.log("in Calc:", props.rETHRatios[0].rate)
        APY1D = 100*365*(props.rETHRatios[0].rate/props.rETHRatios[1].rate-1);
        console.log("APY1D: ", APY1D)
        APY1W = 100*52*(props.rETHRatios[0].rate/props.rETHRatios[7].rate-1);
        APY1M = 100*12*(props.rETHRatios[0].rate/props.rETHRatios[30].rate-1);
        APY1Y = 100*(props.rETHRatios[0].rate/props.rETHRatios[365].rate-1);
    }

    {calcAPYs()}

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
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-300">since last weeks</dt>
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







