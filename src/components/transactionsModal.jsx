import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TransactionsTable from './transactionsTable'

export default function TransactionsModal() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div>
        <button id="showTransactionModal-button"
          onClick={() => setOpen(true)}
          className="flex w-full justify-center rounded-md border border-transparent bg-slate-500 disabled:bg-gray-200 py-3 px-4 font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Show Previous Transactions
        </button>
      </div>
      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-xl sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Previous Skim Transactions:
                        </Dialog.Title>
                        <div className="mt-2">
                          <TransactionsTable />
                        </div>
                        <hr />
                        <div className="mt-2 text-sm text-gray-400">
                          Previous rETH skim transactions show up here. These transactions are stored locally in your browser. If you use a different browser, or delete the local browser storage they are not showing up anymore.
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div >
  )
}
