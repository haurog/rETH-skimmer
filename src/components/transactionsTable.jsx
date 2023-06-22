import { useAccount, useNetwork } from 'wagmi';

const toStoreTransactions1 = [
    { date: '2023-06-01', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
    { date: '2023-06-22', skimAmount: '0.0123', dateRange: '-', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
    { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
    // More people...
  ]

  const toStoreTransactions2 = [
    { date: '2024-06-01', skimAmount: '0.0245', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
    { date: '2024-06-22', skimAmount: '0.0245', dateRange: '-', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
    { date: '2024-06-29', skimAmount: '0.0245', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
    // More people...
  ]

  export default function TransactionsTable() {
    const { address} = useAccount()
    const { chain } = useNetwork()
    const chainName = chain.name;

    console.log("address: ", address, " chain: ", chainName)

    let transactionsObject = {}
    transactionsObject['Goerli'] = toStoreTransactions1
    transactionsObject['Ethereum'] = toStoreTransactions2

    console.log("transactionsObject: ", transactionsObject)

    if (address && chain.name) {
      localStorage.setItem(address, JSON.stringify(transactionsObject))
    }

    let transactions = JSON.parse(localStorage.getItem(address))[chainName]

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className=" sm:items-center">
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
