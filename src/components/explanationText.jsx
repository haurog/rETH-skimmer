
export default function ExplanationText() {
  return (
    <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-4 xl:col-span-5 2xl:col-span-6 lg:flex lg:items-center lg:text-left">
      <div>
        <h1 className="mt-4 text-4xl font-bold text-gray-100 tracking-tight sm:text-5xl md:text-5xl">
          Skim your rETH rewards
        </h1>
        <div className="text-lg text-gray-100 sm:text-xl">
          <p className="mt-3">
            The rETH skimmer app allows to skim the profits from the increasing value of rETH compared to ETH.
            You can either select a specific time period to calculate the profit or by switching to 'by remaining ETH'
            you can calculate the skimming amount by defining the equivalent ETH that should remain after skimming.
          </p>
          <p className="mt-3">
            The calculations for rETH value increase are based on the protocol rates, disregarding any premium associated with rETH io secondary markets.
          </p>
          <p className="mt-3">
            Exchanging rETH for ETH happens directly through the <a className="underline" href="https://etherscan.io/address/0xae78736Cd615f374D3085123A210448E74Fc6393">rETH contract</a>.
            You can also copy the calculated rETH to skim and swap it to ETH using the <a className="underline" href="https://stake.rocketpool.net">rocket pool stake website</a>  which initiates the same transaction.        </p>
        </div>
      </div>
    </div>
  )
}
