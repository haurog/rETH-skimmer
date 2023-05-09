// import React, { useContext, useState } from 'react';

export default function RETHAPY() {

    // APY for different time spans
    const APY1D = 8.2;
    const APY1W = 6.554;
    const APY1M = 5.58;
    const APY1Y = 5.5;

    return (
        <div>
            <div className="mx-auto max-w-7xl py-8 px-4 sm:py-10 sm:px-6 lg:px-8 lg:py-5">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                       APY of rETH over different time spans:
                    </h2>
                </div>
                <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
                    <div className="flex flex-col">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-white">since Yesterday</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-white">{APY1D}</dd>
                    </div>
                    <div className="mt-10 flex flex-col sm:mt-0">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-white">since last weeks</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-white">{APY1W}</dd>
                    </div>
                    <div className="mt-10 flex flex-col sm:mt-0">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-white">since a month ago</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-white">{APY1M}</dd>
                    </div>
                    <div className="mt-10 flex flex-col sm:mt-0">
                        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-white">for the last year</dt>
                        <dd className="order-1 text-5xl font-bold tracking-tight text-white">{APY1Y}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}







