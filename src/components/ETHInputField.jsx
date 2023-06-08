

export default function EthInputField(props) {

  return (
    <div>
      <label htmlFor="ETH" className="block text-sm leading-6 text-gray-900">
        ETH amount that should remain after skimming:
      </label>
      <input
        value={props.ETHToRemain}
        onChange={props.handleETHToRemainChange}
        type="number"
        name="ETH"
        id="ETH"
        placeholder="ETH"
        required
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
      />
    </div>
  )

}