import React from 'react';

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, } from 'wagmi';
import { ethers } from 'ethers';

import { ToastContainer, toast } from 'react-toastify'

import { addressesToken } from '../helper/Addresses';
import rETH_CONTRACT_ABI from "../ABI/rETH_ABI.json";
const rETH_CONTRACT_ADDRESS = addressesToken.rETH;

export default function SkimRewards(props) {

  // const { configApprove } = usePrepareContractWrite({
  //   address: rETH_CONTRACT_ADDRESS,
  //   abi: rETH_CONTRACT_ABI,
  //   functionName: 'approve',
  //   args: [rETH_CONTRACT_ADDRESS, ethers.utils.parseEther(props.rETHValue.toFixed(18).toString())],
  //   // overrides: { value: ethers.utils.parseEther(tokenAmount.toFixed(18).toString()), },
  // })

  // const approveRETH = useContractWrite(configApprove)

  const { config } = usePrepareContractWrite({
    address: rETH_CONTRACT_ADDRESS,
    abi: rETH_CONTRACT_ABI,
    functionName: 'burn',
    args: [ethers.utils.parseEther(props.rETHValue.toFixed(18).toString())],
  })

  const sendRETH = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: sendRETH.data?.hash,
    onSuccess(data) {
      console.log('Success', data)
      const CustomToastWithLink = () => (
        <div>
          <a href={"https://etherscan.io/tx/" + data.transactionHash}>Carbon emission offset</a>
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
      {/* <button
        onClick={approveRETH.write}
        className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Approve rETH {props.rETHValue > 0 ? '(' + props.rETHValue.toPrecision(3) + ' rETH)' : ''}
      </button> */}

      <button
        onClick={sendRETH.write}
        className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Skim rETH rewards {props.rETHValue > 0 ? '(' + props.rETHValue.toPrecision(3) + ' rETH)' : ''}
      </button>
    </div>

  )
}