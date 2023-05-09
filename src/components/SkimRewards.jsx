import React, { useContext, useState } from 'react';

import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction, } from 'wagmi';
import { ethers } from 'ethers';

import { ToastContainer, toast } from 'react-toastify'

import { addressesToken } from '../helper/Addresses';
import SwapAndRetireContract from "../ABI/disCarbonSwapAndRetire_0x96F2244A8094a4B1F57257e0641A94a6B13C8827.json";
const CONTRACT_ADDRESS = "0x96F2244A8094a4B1F57257e0641A94a6B13C8827";

const projectAddress = ethers.constants.AddressZero

export default function SkimRewards(props) {

  const [tokenAmount, setTokenAmount] = useState(0);

  // console.log("Props in offsetbutton: ", props.value)

  // const contractRead = useContractRead({
  //   address: CONTRACT_ADDRESS,
  //   abi: SwapAndRetireContract,
  //   functionName: 'calculateNeededAmount',
  //   args: [addressesToken.WMATIC, ethers.utils.parseEther(props.value.toFixed(18).toString()), 0, true],
  //   watch: true,
  //   onSuccess(data) {
  //     console.log('Successful estimate of cost: ', ethers.utils.formatEther(data.toString()));
  //     let tokenAmountPlusMargin = ethers.utils.formatEther(data) * 1.01;
  //     setTokenAmount(tokenAmountPlusMargin);
  //   },
  // })

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: SwapAndRetireContract,
    functionName: 'retireWithMatic',
    args: [ethers.utils.parseEther(props.value.toFixed(18).toString()), 0, projectAddress],
    overrides: { value: ethers.utils.parseEther(tokenAmount.toFixed(18).toString()), },
  })

  const contractWrite = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess(data) {
      console.log('Success', data)
      const CustomToastWithLink = () => (
        <div>
          <a href={"https://polygonscan.com/tx/" + data.transactionHash}>Carbon emission offset</a>
        </div>
      );
      const notify = () => {
        toast.success(CustomToastWithLink, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
      notify();
    },
    onError(error) {
      console.log('Error', error)
      const notify = () => toast("Transaction failed");
      notify();
    },
  })

  // console.log('tokenAmount; ', tokenAmount);

  return (
    <div>
      <button
        onClick={contractWrite.write}
        className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Skim rETH rewards {tokenAmount > 0 ? '(' + tokenAmount.toPrecision(3) + ' rETH)' : ''}
      </button>
    </div>

  )
}