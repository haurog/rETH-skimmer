// const calculationMethod = [
//     { id: 'date', title: 'by date range' },
//     { id: 'eth', title: 'define remaining ETH' },
//   ]

//   export default function Example() {
//     return (
//       <div>
//         <label className="text-base font-semibold text-gray-900">Calculation Method</label>
//         <fieldset className="mt-4">
//           <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
//             {calculationMethod.map((calculationMethod) => (
//               <div key={calculationMethod.id} className="flex items-center">
//                 <input
//                   id={calculationMethod.id}
//                   name="notification-method"
//                   type="radio"
//                   defaultChecked={calculationMethod.id === 'date'}
//                   className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                 />
//                 <label htmlFor={calculationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
//                   {calculationMethod.title}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </fieldset>
//       </div>
//     )
//   }

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const methods = [
  { name: 'by date'},
  { name: 'by remaining ETH'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DateETHToggler() {
  const [method, setMethod] = useState(methods[0])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6 text-gray-900">Calculation Method</h2>
      </div>

      <RadioGroup value={method} onChange={setMethod} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a calculation method</RadioGroup.Label>
        <div className="grid gap-3 grid-cols-2">
          {methods.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  'cursor-pointer focus:outline-none',
                  active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                  checked
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                )
              }
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}