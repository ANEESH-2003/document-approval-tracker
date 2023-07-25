"use client";
import Link from "next/link";
import DocumentComponent from "./DocumentComponent";
import TopBar from "../TopBar/page";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { useStore } from "@/store";
import EmptyComponent from "../EmptyComponent/page";

const navigation = [
  { name: "Dashboard", href: "/../dashboard" },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];

const userDocs = [
  {
    id: 1,
    idx: 0,
    title: "fail all the students",
    status: "under-consideration",
    assignedBy: "sandeep saini",
    currentlyassigned: "sdhfbsdbijsdji",
  },
  {
    id: 2,
    idx: 0,
    title: "kill all the students",
    status: "accepted",
    assignedBy: "laxmi mittal",
    currentlyassigned: "sdhfbsdbijsdji",
  },
  {
    idx: 0,
    id: 3,
    title: "pass all the students",
    status: "rejected",
    assignedBy: "nobody",
    currentlyassigned: "sdhfbsdbijsdji",
  },
];

export default function ApprovalDashboard() {
  const DocInfo = useStore((state) => state.docs);
  const acceptedDocs = DocInfo.filter((item) => item.status === "accepted");
  const rejectedDocs = DocInfo.filter((item) => item.status === "rejected");
  const UCDocs = DocInfo.filter((item) => item.status === "In progress");

  return (
    <>
      <div className="min-h-full">
        <TopBar page="Dashboard" navigation={navigation} />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
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
                {acceptedDocs.length == 0 ? (
                  <EmptyComponent />
                ) : (
                  <ul className="flex-row mx-auto w-[100%] py-6 content-center">
                    {acceptedDocs.map((item) => (
                      <Link
                        key={item.idx}
                        href={{
                          pathname: "/document",
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
                {rejectedDocs.length == 0 ? (
                  <EmptyComponent />
                ) : (
                  <ul className="flex-row mx-auto w-[100%] py-6 content-center">
                    {rejectedDocs.map((item) => (
                      <Link
                        key={item.idx}
                        href={{
                          pathname: "/document",
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
                {UCDocs.length == 0 ? (
                  <EmptyComponent />
                ) : (
                  <ul className="flex-row mx-auto w-[100%] py-6 content-center">
                    {UCDocs.map((item) => (
                      <Link
                        key={item.idx}
                        href={{
                          pathname: "/document",
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
