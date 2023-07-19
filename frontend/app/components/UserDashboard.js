'use client'

import Link from 'next/link'
import DocumentComponent from '../components/DocumentComponent'
import TopBar from '../TopBar/page'
import {Tab} from '@headlessui/react'
import {Fragment, useEffect} from 'react'
import {useStore} from "@/store";

const navigation = [
  {name: 'Dashboard', href: '/../dashboard'},
  {name: 'Team', href: '#', current: false},
  {name: 'Projects', href: '#', current: true},
  {name: 'Issue Application', href: '../IssueApplication', current: false},
  {name: 'Reports', href: '#', current: false},
]

const userDocs = [
  {
    id: 1,
    title: 'fail all the students',
    status: 'under-consideration',
    assignedBy: 'sandeep saini',
    currentlyassigned: 'sdhfbsdbijsdji'
  },
  {
    id: 2,
    title: 'kill all the students',
    status: 'accepted',
    assignedBy: 'laxmi mittal',
    currentlyassigned: 'sdhfbsdbijsdji'
  },
  {
    id: 3,
    title: 'pass all the students',
    status: 'rejected',
    assignedBy: 'nobody',
    currentlyassigned: 'sdhfbsdbijsdji'
  },
]

export default function Dashboard() {
  const DocsInfo = useStore((state) => state.docs);
  const acceptedDocs = DocsInfo.filter((item) => (item.status === 'Accepted'));
  const rejectedDocs = DocsInfo.filter((item) => (item.status === 'Rejected'));
  const UCDocs = DocsInfo.filter((item) => (item.status === 'In progress'));

  return (
    <>
      <div className="min-h-full">
        <TopBar page="Dashboard" navigation={navigation} />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              User Dashboard
            </h1>
          </div>
        </header>
        <main className="w-[100%]">
          <Tab.Group>
            <Tab.List className="flex justify-around w-full pt-3 justify-items-center">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "bg-lime-500 p-2 text-white rounded-xl font-bold"
                        : "bg-white p-2 text-lime-500 font-bold"
                    }
                  >
                    Accepted
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "bg-red-500 p-2 text-white rounded-xl font-bold"
                        : "bg-white p-2 text-red-500 font-bold"
                    }
                  >
                    Rejected
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "bg-yellow-500 p-2 text-white rounded-xl font-bold"
                        : "bg-white p-2 text-yellow-500 font-bold"
                    }
                  >
                    Under-Consideration
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ul className="flex-row mx-auto w-[100%] py-6 content-center">
                  {acceptedDocs.map((item) => (
                    <Link
                      key={item.idx}
                      href={{ pathname: "/UserDocument", query: { idx: item.idx } }}
                    >
                      <li>
                        <DocumentComponent doc={item} />
                      </li>
                    </Link>
                  ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel>
                <ul className="flex-row mx-auto w-[100%] py-6 content-center">
                  {rejectedDocs.map((item) => (
                    <Link
                      key={item.idx}
                      href={{ pathname: "/UserDocument", query: { idx: item.idx } }}
                    >
                      <li>
                        <DocumentComponent doc={item} />
                      </li>
                    </Link>
                  ))}
                </ul>
              </Tab.Panel>
              <Tab.Panel>
                <ul className="flex-row mx-auto w-[100%] py-6 content-center">
                  {UCDocs.map((item) => (
                    <Link
                      key={item.idx}
                      href={{ pathname: "/UserDocument", query: { idx: item.idx } }}
                    >
                      <li>
                        <DocumentComponent doc={item} />
                      </li>
                    </Link>
                  ))}
                </ul>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>
      </div>
    </>
  );
}
