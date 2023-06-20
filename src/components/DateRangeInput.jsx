import Datepicker from "react-tailwindcss-datepicker";
import { Tooltip } from 'react-tooltip'
import { importantDates } from '../helper/ImportantDates';

export default function DateRangeInput(props) {

  let tooltipText = ""
  if (props.inputDisabled) {
    tooltipText = "The rETH exchange rates have not been loaded yet. This might take up to 15 seconds."
  }

  return (
    <div>
      <label className="block text-sm leading-6 text-gray-900">
        Date range over which to calculate the rETH yield:
      </label>
      <div
        data-tooltip-id="input-field-tooltip"
        data-tooltip-content={tooltipText}
        data-tooltip-place="bottom">
        <Datepicker
          primaryColor={"orange"}
          showShortcuts={true}
          showFooter={false}
          startWeekOn="mon"
          minDate={importantDates.rocketPoolStartDateForCalendar}
          maxDate={importantDates.today}
          startFrom={importantDates.startOfLastMonth}
          configs={{
            shortcuts: {
              past: period => `Last ${period} days`,
              currentMonth: "Current Month",
              pastMonth: "Past Month"
            }
          }}
          value={props.dateRange}
          onChange={props.handleDateRangeChange}
          disabled={props.inputDisabled}
        />
      </div>
      <Tooltip id="input-field-tooltip" />
    </div>
  )

}