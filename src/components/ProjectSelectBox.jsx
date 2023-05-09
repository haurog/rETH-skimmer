import React from 'react';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import images from '../img/*.jpg'


import florestal from "/src/img/florestal.jpg";
import pacajai from "/src/img/Pacajai.jpg";
import cordillera from "/src/img/Cordillera_Azul.jpg";
import ndombe from "/src/img/Mai_Ndombe.jpg";
import kasigau from "/src/img/Kasigau.jpg";

const projects = [
    {
        id: 1, name: 'Florestal Santa Maria REDD Project, Brasil',
        address: '0x0bccab36f518f55e00f3efe2e828ae63cd2ac1b9',
        image: florestal,
        url: 'https://santamariaproject.com/',
        verra: 'https://registry.verra.org/app/projectDetail/VCS/875'
    },

    {
        id: 2, name: 'Pacajai REDD+ Project, Brasil',
        address: '0xeaa9938076748d7edd4df0721b3e3fe4077349d3',
        image: pacajai,
        url: 'https://registry.verra.org/app/projectDetail/VCS/981',
        verra: 'https://registry.verra.org/app/projectDetail/VCS/981'
    },
    {
        id: 3, name: 'The Mai Ndombe REDD+ Project, DRC',
        address: '0xf0b3aed0232b3c51693323e45878c9173b6c43fe',
        image: ndombe,
        url: 'https://everland.earth/projects/mai-ndombe/',
        verra: 'https://registry.verra.org/app/projectDetail/VCS/934'
    },
    {
        id: 4, name: 'Cordillera Azul National Park REDD Project, Peru',
        address: '0xb00110cc12cdc8f666f33f4e52e4957ff594282f',
        image: cordillera,
        url: 'https://www.cima.org.pe/en/cordillera-azul-national-park/cordillera-azul-redd-project',
        verra: 'https://registry.verra.org/app/projectDetail/VCS/985'
    },
    {
        id: 5, name: 'The Kasigau Corridor REDD Project, Keynya',
        address: '0xb8802c009dd265b38e320214a7720ebd7a488827',
        image: kasigau,
        url: 'https://www.wildlifeworks.com/kenya',
        verra: 'https://registry.verra.org/app/projectDetail/VCS/612'
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProjectSelection(props) {
    const [selected, setSelected] = useState(projects[3])

    props.onChange(selected.address);  // updates selected project upon initialization. Gives a console error, but works.

    const handleProjectChange = event => {
        setSelected(event)
        console.log("Project Change ", selected)
        props.onChange(event.address);
    };

    return (
        <Listbox value={selected} onChange={handleProjectChange}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">Offset Project:</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm">
                            <span className="inline-flex w-full truncate">
                                <span className="truncate">{selected.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {projects.map((project) => (
                                    <Listbox.Option
                                        key={project.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-black bg-green-500' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={project}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className="inline-flex w-full truncate">
                                                    <span className="truncate">{project.name}</span>
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-green-500',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>

                        <div className="mt-2">
                            <a href={selected.url}>
                                <img className="rounded-md" src={selected.image} alt={selected.name}></img>
                            </a>
                            <div><a href={selected.verra}>Verra registry entry</a></div>
                        </div>
                    </div>
                </>
            )}
        </Listbox>
    )
}