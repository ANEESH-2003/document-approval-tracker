"use client";

import Link from "next/link";
import DocumentComponent from "../components/DocumentComponent";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useStore } from "@/store";
import EmptyComponent from "../EmptyComponent/page";

const userDocs = [
  {
    id: 1,
    title: "fail all the students",
    status: "under-consideration",
    assignedBy: "sandeep saini",
    currentlyassigned: "sdhfbsdbijsdji",
  },
  {
    id: 2,
    title: "kill all the students",
    status: "accepted",
    assignedBy: "laxmi mittal",
    currentlyassigned: "sdhfbsdbijsdji",
  },
  {
    id: 3,
    title: "pass all the students",
    status: "rejected",
    assignedBy: "nobody",
    currentlyassigned: "sdhfbsdbijsdji",
  },
];
/* "data": [
        {
            "_id": "64ad3325509e1948f7b6600e",
            "timestamp": "2023-07-11T10:44:52.712Z",
            "department": "Dep1",
            "status": "In progress",
            "title": "Test Doc",
            "description": "This is a test document.",
            "url": [
                {
                    "doc": "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1689072421/v20mmwpymnxeursyx8oa.pdf",
                    "_id": "64ad3325509e1948f7b6600f",
                    "timestamp": "2023-07-11T10:47:01.777Z"
                },
                {
                    "_id": "64ad384a80bdfb0651f77205",
                    "timestamp": "2023-07-11T11:08:58.065Z"
                },
                {
                    "_id": "64ad3999fafb337b7f3f29d4",
                    "timestamp": "2023-07-11T11:14:33.150Z"
                },
                {
                    "doc": "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1689074452/uf4klpjiat9ydeg8yl2n.pdf",
                    "_id": "64ad32d4509e1948f7b6600a",
                    "timestamp": "2023-07-11T11:20:52.785Z",
                    "name": "DHoD Dep1",
                    "email": "dhod@dep1.com",
                    "phone": "7869452130",
                    "position": "DHoD",
                    "department": "Dep1"
                }
            ],
            "past": [
                {
                    "_id": "64ad32ac509e1948f7b66007",
                    "name": "Clark Dep1",
                    "email": "clark@dep1.com",
                    "phone": "8769452130",
                    "position": "Clark",
                    "department": "Dep1"
                },
                {
                    "_id": "64ad32d4509e1948f7b6600a",
                    "name": "DHoD Dep1",
                    "email": "dhod@dep1.com",
                    "phone": "7869452130",
                    "position": "DHoD",
                    "department": "Dep1"
                },
                {
                    "_id": "64ad32d4509e1948f7b6600a",
                    "name": "DHoD Dep1",
                    "email": "dhod@dep1.com",
                    "phone": "7869452130",
                    "position": "DHoD",
                    "department": "Dep1"
                }
            ],
            "current": {
                "_id": "64ad2db209839fe91b3962cc",
                "name": "HoD Dep1",
                "email": "hod@dep1.com",
                "phone": "8796452130",
                "position": "HoD",
                "department": "Dep1"
            },
            "owner": {
                "_id": "64a558d56424bcfe508f15f6",
                "name": "Test Sample",
                "email": "test@example.com",
                "phone": "9876543210",
                "position": "None",
                "department": "None"
            },
            "eligible": [
                {
                    "_id": "64a594327df2566ac3636032",
                    "name": "DHoD DHoD",
                    "email": "dhod@xyz.com",
                    "phone": "9876543210",
                    "position": "DHoD",
                    "department": "XYZ"
                }
            ]
        }
    ] */
export default function Dashboard() {
  const DocInfo = useStore((state) => state.docs);
  const acceptedDocs = DocInfo.filter((item) => item.status === "accepted");
  const rejectedDocs = DocInfo.filter((item) => item.status === "rejected");
  const UCDocs = DocInfo.filter((item) => item.status === "In progress");
  return (
    <>
      <div className="min-h-screen capitalize">
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
                {acceptedDocs.length === 0 ? (
                  <EmptyComponent />
                ) : (
                  <ul className="flex-row mx-auto w-[100%] py-6 mt-5 content-center">
                    {acceptedDocs.map((item) => (
                      <Link
                        key={item.idx}
                        href={{
                          pathname: "/UserDocument",
                          query: { idx: item.idx },
                        }}
                      >
                        <li key={item._id}>
                          <DocumentComponent doc={item} />
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
              <Tab.Panel>
                {rejectedDocs.length === 0 ? (
                  <EmptyComponent />
                ) : (
                  <ul className="flex-row mx-auto w-[100%] py-6 mt-5 content-center">
                    {rejectedDocs.map((item) => (
                      <Link
                        key={item.idx}
                        href={{
                          pathname: "/UserDocument",
                          query: { idx: item.idx },
                        }}
                      >
                        <li key={item._id}>
                          <DocumentComponent doc={item} />
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
              <Tab.Panel>
                {UCDocs.length === 0 ? (
                  <EmptyComponent />
                ) : (
                  <ul className="flex-row mx-auto w-[100%] py-6 mt-5 content-center">
                    {UCDocs.map((item) => (
                      <Link
                        key={item.idx}
                        href={{
                          pathname: "/UserDocument",
                          query: { idx: item.idx },
                        }}
                      >
                        <li key={item._id}>
                          <DocumentComponent doc={item} />
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>
      </div>
    </>
  );
}
