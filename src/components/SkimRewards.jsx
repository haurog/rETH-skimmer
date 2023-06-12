import React from 'react';

import { usePrepareContractWrite, useContractWrite, useTransaction, useWaitForTransaction, useNetwork } from 'wagmi';
import { ethers } from 'ethers';

import { ToastContainer, toast } from 'react-toastify'

import { addressesToken } from '../helper/Addresses';
import rETH_CONTRACT_ABI from "../ABI/rETH_ABI.json";


export default function SkimRewards(props) {

  const { chain } = useNetwork();
  let chainName = 'Ethereum'
  if (chain?.name == "Goerli") {
    chainName = chain.name
  }
  const rETH_CONTRACT_ADDRESS = addressesToken[chainName].rETH;

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

  const transaction = useTransaction({
    hash: sendRETH.data?.hash,
    onSuccess(data, error) {
      let etherscanURL = "https://etherscan.io/tx/"
      if (chain.name == 'Goerli') {
        etherscanURL = "https://goerli.etherscan.io/tx/"
      }
      console.log("useTransaction, data: ", data, " error: ", error, " sendRETH: ", sendRETH)
      const SubmittedToast = () => (
        <div>
          <a href={etherscanURL + sendRETH.data.hash}>Transaction submitted.</a>
        </div>
      );
      console.log("contract write, data: ", data, " error: ", error)
      if (!error) {
        const notify = () => {
          toast.info(SubmittedToast, {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        };
        notify();
      }
    },
  })

  const waitForTransaction = useWaitForTransaction({
    hash: sendRETH.data?.hash,
    onSuccess(data) {
      let etherscanURL = "https://etherscan.io/tx/"
      if (chain.name == 'Goerli') {
        etherscanURL = "https://goerli.etherscan.io/tx/"
      }
      console.log('Success', data)
      const SucceededToast = () => (
        <div>
          <a href={etherscanURL + data.transactionHash}>surplus rETH skimmed.</a>
        </div>
      );
      const notify = () => {
        toast.success(SucceededToast, {
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
        className="flex w-full justify-center rounded-md border border-transparent bg-slate-500 disabled:bg-gray-200 py-3 px-4 font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        disabled={props.rETHValue > 0 ? false : true}>
        Skim rETH rewards {props.rETHValue > 0 ? '(' + props.rETHValue.toPrecision(3) + ' rETH)' : ''}
      </button>
    </div>

  )
}