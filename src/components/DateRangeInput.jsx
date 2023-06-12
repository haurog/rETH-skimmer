import Datepicker from "react-tailwindcss-datepicker";
import { importantDates } from '../helper/ImportantDates';

export default function DateRangeInput(props) {

  return (
    <div>
      <label className="block text-sm leading-6 text-gray-900">
        Date range over which to calculate the rETH yield:
      </label>
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
      />
    </div>
  )

}