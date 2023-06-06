import { RadioGroup } from '@headlessui/react'

import { methods } from '../helper/objects'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DateETHToggler(props) {

  // console.log("Methods: ", props)

  if (!props.methodChosen) {
    props.setMethodChosen(methods[0]);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6 text-gray-900">Calculation Method</h2>
      </div>

      <RadioGroup value={props.methodChosen} onChange={props.handleMethodsChange} className="mt-2">
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