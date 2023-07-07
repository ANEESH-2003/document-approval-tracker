'use client'

import DocumentComponent from './DocumentComponent'
import { useRouter } from 'next/navigation'
import TopBar from '../TopBar/page'


const userDocs=[
  {id: 1 ,title: 'fail all the students', status: 'under-consideration', assignedBy: 'sandeep saini',currentlyassigned: 'sdhfbsdbijsdji'},
  {id: 2 ,title: 'kill all the students', status: 'accepted', assignedBy: 'laxmi mittal',currentlyassigned: 'sdhfbsdbijsdji'},
  {id: 3 ,title: 'pass all the students', status: 'rejected', assignedBy: 'nobody',currentlyassigned: 'sdhfbsdbijsdji'},
]

export default function Dashboard() {
  const router=useRouter();
  const docOnClick=()=>{
    router.push('/../document');
  }
  return (
    <>
      <div className="min-h-full">
        <TopBar page="Dashboard"/>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Dashboard</h1>
          </div>
        </header>
        <main>
          <ul className="flex-row mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 justify-items-center">
            {userDocs.map((item)=>(
              <li key={item.id}>
                <DocumentComponent doc={item} onClick={docOnClick}/>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  )
}
