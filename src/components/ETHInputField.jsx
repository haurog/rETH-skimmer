import { Tooltip } from 'react-tooltip'


export default function EthInputField(props) {

  let tooltipText = ""
  if (props.inputDisabled) {
    tooltipText = "The rETH exchange rates have not been loaded yet.\n This might take up to 15 seconds."
  }

  return (
    <div>
      <label htmlFor="ETH" className="block text-sm leading-6 text-gray-900">
        ETH amount that should remain after skimming:
      </label>
      <div
        data-tooltip-id="input-field-tooltip"
        data-tooltip-content={tooltipText}
        data-tooltip-place="bottom">
        <input
          value={props.ETHToRemain}
          onChange={props.handleETHToRemainChange}
          type="number"
          name="ETH"
          id="ETH"
          placeholder="ETH"
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5"
          disabled={props.inputDisabled}
        />
        <Tooltip id="input-field-tooltip" />
      </div>
    </div>
  )

}