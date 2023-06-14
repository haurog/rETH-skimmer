import React, { useState } from 'react';

import { Popover } from '@headlessui/react'

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Calculator from './calculator.jsx';
import RETHAPYFooter from './RETHAPYFooter.jsx';
import ContactFooter from './contactFooter.jsx';

import { rETHRatiosHardcoded } from './../helper/rETHRatios.js'

import logo from './../img/rocket_modified_plain.svg';

const rocketScanRETHURL = 'https://rocketscan.io/api/mainnet/reth';


export default function Example() {
  const [rETHRatios, setRETHRatios] = useState(0);

  // console.log("rETHRatios state: ", rETHRatios)
  // if (rETHRatios == 0) {
  //   setRETHRatios(rETHRatiosHardcoded);
  // }
  console.log("rETHRatios state: ", rETHRatios)

  if (rETHRatios == 0) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rocketScanRETHURL)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        let rETHRatiosVariable = JSON.parse(data.contents).ratios;
        // console.log("rETHRatiosVariable: ", rETHRatiosVariable)
        setRETHRatios(rETHRatiosVariable);
      }
      );
  }

  return (
    <div className="relative overflow-hidden bg-contain bg-gradient-to-t from-slate-500 to-orange-500 min-h-screen">
      <div className="hidden sm:absolute sm:inset-0 sm:block" aria-hidden="true">
        <img className="absolute bottom-0 right-0 -translate-x-4 md:-translate-x-1/4 -translate-y-28 lg:-translate-y-10 2xl:-translate-y-16 transform text-emerald-700 top-0 mt-[580px] lg:mt-56 lg:mb-0 w-20 md:w-32 2xl:w-48" src={logo} alt="Rocket Pool Logo" />
      </div>
      <div className="relative pt-6 pb-16 sm:pb-12">
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

        <main className="mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12">
              <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-4 xl:col-span-5 2xl:col-span-6 lg:flex lg:items-center lg:text-left">
                <div>
                  <h1 className="mt-4 text-4xl font-bold text-gray-100 tracking-tight sm:text-5xl md:text-5xl">
                    Skim your rETH rewards
                  </h1>
                  <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Calculate rETH gains relative to ETH for a given time period.
                  </p>
                  <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    The excess rETH can then be exchanged to ETH using the rocket pool deposit contract.
                  </p>
                </div>
              </div>
              <Calculator rETHRatios={rETHRatios} />
            </div>
          </div>
        </main>
      </div>
      <RETHAPYFooter rETHRatios={rETHRatios} />
      <ContactFooter />
    </div>
  )
}