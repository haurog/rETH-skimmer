/* This example requires Tailwind CSS v3.0+ */
import React, { useState } from 'react';

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Calculator from './calculator.jsx';
import RETHAPYFooter from './RETHAPYFooter.jsx';



const rocketScanRETHURL = 'https://rocketscan.io/api/mainnet/reth';


export default function Example() {
  const [rETHRatios, setRETHRatios] = useState(0);

  console.log("rETHRatios state: ", rETHRatios)

  if (rETHRatios == 0) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rocketScanRETHURL)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        rETHRatiosVariable = JSON.parse(data.contents).ratios;
        // console.log("rETHRatios updated: ", rETHRatiosVariable);
        setRETHRatios(rETHRatiosVariable);
      }
      );
  }



  return (
    <div className="relative overflow-hidden bg-contain bg-gradient-to-t from-slate-500 to-orange-500 min-h-screen">
      <div className="hidden sm:absolute sm:inset-0 sm:block" aria-hidden="true">
        <svg
          className="absolute bottom-0 right-0 translate-x-1/2 transform text-emerald-700 -rotate-45 top-0 mt-[580px] lg:mt-56 lg:mb-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              {/* <rect x={0} y={0} width={4} height={4} fill="currentColor" /> */}
              <circle cx={1.5} cy={1.5} r={3} fill="currentColor" />
            </pattern>
          </defs>
          <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex flex-1 items-center">
            </div>
            <ConnectButton accountStatus="address" />
          </nav>
        </Popover>

        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div>
                  <h1 className="mt-4 text-4xl font-bold text-gray-100 tracking-tight sm:text-5xl md:text-5xl">
                    Skim your rETH rewards
                  </h1>
                  <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    text-gray-300 rETH gains relative to ETH for a given time period.
                  </p>
                  <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    The excess rETH can then be exchanged to ETH using the rocket pool deposit contract.
                  </p>
                </div>
              </div>
              <Calculator />
            </div>
          </div>
        </main>
      </div>
      <RETHAPYFooter rETHRatios={rETHRatios} />
    </div>
  )
}