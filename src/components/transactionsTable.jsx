import { getPreviousTransactions, addTransaction } from "../helper/PreviousTransactions"

export default function TransactionsTable() {
    let transactions = getPreviousTransactions();

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className=" sm:items-center">
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto overflow-y-auto max-h-96 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Skim Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      For Date Range
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      rETH remaining
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      equivalent ETH remaining
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.skimAmount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.dateRange}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.rETHRemaining}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.eqETHRemaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
