'use client'
import TopBar from '../TopBar/page'
import UserCard from '../UserCard/page'
import Link from 'next/link' 
import { useState,Fragment } from 'react'
import { Listbox, Transition} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
/* info given by server */
const docInfo={
    id: 1 ,
    title: 'fail all the students', 
    status: 'under-consideration', 
    assignedBy: 'sandeep saini',
    currentlyassigned: 'some nigga',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    signedBy: [
      {
        name: 'sandeep saini',
        designation: 'DOA',
        empId: 69
      },
      {
        name: 'rahul banergee',
        designation: 'Director',
        empId: 80
      },
      {
        name: 'laxmi mittal',
        designation: 'chor',
        empId: 420
      },
    ],
    docURL: 'https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf',
    eligibleAssignees: [
      { id: 0, designation: '', name:'None'},
      { id: 1, designation: 'mechanical-teacher', name: 'Wade Cooper' },
      { id: 2, designation: 'computer-teacher', name: 'Arlene Mccoy' },
      { id: 3, designation: 'electrical-teacher', name: 'Devon Webb' },
      { id: 4, designation: 'phd-teacher', name: 'Tom Cook' },
      { id: 5, designation: 'president', name: 'Tanya Fox' },
      { id: 6, designation: 'vivacity-head', name: 'Hellen Schmidt' },
    ],
} 
export default function page() {
  const [currentStatus,setcurrentStatus]=useState(docInfo.status);
  const [selected, setSelected] = useState(docInfo.eligibleAssignees[0]);
  const [Active,setActive] =useState(true);
  const acceptbuttonclick=()=>{
    setActive(!Active);
    setcurrentStatus('accepted');
  }
  const rejectbuttonclick=()=>{
    setActive(!Active);
    setcurrentStatus('rejected');
  }
  return (
    <div className="min-h-full capitalize">
        <TopBar page="Dashboard"/>
        <main className="max-w-[95%] shadow-lg bg-slate-200 m-10 rounded-md">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className='flex justify-between'>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">{docInfo.title}</h1>
                <div className="text-xl pt-3">
                  {currentStatus=="accepted" ? (
                  <p className="mt-1 leading-5 text-green-500 font-bold">
                      Accepted
                  </p>
                  ) : (currentStatus=="rejected" ?(
                      <p className="mt-1 leading-5 text-red-500 font-bold">
                      Rejected
                  </p>
                  ) : 
                  (
                      <p className="mt-1 leading-5 text-yellow-500 font-bold">
                      Under-consideration
                      </p>
                  ))}
              </div>
              </div>
              <Link href={docInfo.docURL} target='_blank'>
              <div className='border-4 border-blue-400 bg-lime-400 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-11 h-13 my-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
</svg>
              </div>
              </Link>
            </div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 pt-3'>{docInfo.description}</h3>
            {docInfo.signedBy.length==0
            ?null:
            <div className='flex-row'>
              <h2 className='text-sm font-normal leading-6 text-gray-900 pt-3'>Till now this document has been signed by:</h2>
              <ul className='flex-row max-w-sm pt-3 items-start'>
                {docInfo.signedBy.map((item)=><UserCard user={item}/>)}
              </ul>
            </div>}
            <div className='flex justify-between max-w-sm pt-2'>
      {currentStatus=='rejected'?<></>:<button 
        type='submit' 
        onClick={acceptbuttonclick}
        className='bg-lime-200 mt-3 w-[45%] rounded-lg'
        disabled={!Active}
       >
        <h2 className='text-lg font-bold p-2 text-lime-700'>{currentStatus=='accepted'?'Accepted':'Accept'}</h2>
      </button>}
      {currentStatus=='accepted'?<></>:<button 
        type='submit' 
        onClick={rejectbuttonclick}
        className='bg-red-200 mt-3 w-[45%] rounded-lg'
        disabled={!Active}
       >
        <h2 className='text-lg font-bold p-2 text-red-700'>{currentStatus=='rejected'?'Rejected':'Reject'}</h2>
      </button>}
      </div>
            {currentStatus=='accepted'?<><p className='text-sm font-normal leading-6 text-gray-900 pt-3'>Whom should you further assign this complaint to:</p>
            <Listbox value={selected} onChange={setSelected} className='max-w-sm'>
        <div className="relative mt-1 pt-3">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name} {selected.designation==''?null:<>({selected.designation})</>}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {docInfo.eligibleAssignees.map((person) => (
                <Listbox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox></>:null}
          </div>
        </main>
      </div>
  )
}
