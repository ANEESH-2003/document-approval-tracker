"use client";
import TopBar from "../TopBar/page";
import UserCard from "../UserCard/page";
import { useState, Fragment } from "react";
import SvgComponent from "./svgComponent";

const navigation = [
  { name: "Dashboard", href: "/../UserDashboard" },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: true },
  { name: "Issue Application", href: "../IssueApplication", current: false },
  { name: "Reports", href: "#", current: false },
];

/* info given by server */
const docInfo = {
  id: 1,
  title: "fail all the students",
  status: "under-consideration",
  assignedBy: "sandeep saini",
  currentlyassigned: "some nigga",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  signedBy: [
    {
      name: "sandeep saini",
      designation: "DOA",
      versionurl:
        "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      empId: 69,
    },
    {
      name: "rahul banergee",
      designation: "Director",
      versionurl:
        "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      empId: 80,
    },
    {
      name: "laxmi mittal",
      designation: "chor",
      versionurl: "",
      empId: 420,
    },
  ],
  attachments: [
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc1doc1doc1doc1doc1",
      id: 1,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc2",
      id: 2,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc2",
      id: 3,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc1doc1doc1doc1doc1",
      id: 1,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc2",
      id: 2,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc2",
      id: 3,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc1doc1doc1doc1doc1",
      id: 1,
    },
    {
      url: "https://res.cloudinary.com/dvpz3gjsj/image/upload/v1688558461/qcc5gok8srkfmse9wbar.pdf",
      name: "doc2",
      id: 2,
    },
  ],
  eligibleAssignees: [
    { id: 0, designation: "", name: "None" },
    { id: 1, designation: "mechanical-teacher", name: "Wade Cooper" },
    { id: 2, designation: "computer-teacher", name: "Arlene Mccoy" },
    { id: 3, designation: "electrical-teacher", name: "Devon Webb" },
    { id: 4, designation: "phd-teacher", name: "Tom Cook" },
    { id: 5, designation: "president", name: "Tanya Fox" },
    { id: 6, designation: "vivacity-head", name: "Hellen Schmidt" },
  ],
};
export default function page() {
  const [currentStatus, setCurrentStatus] = useState(docInfo.status);
  return (
    <div className="min-h-full capitalize">
      <TopBar page="Dashboard" navigation={navigation} />
      <main className="max-w-[95%] shadow-lg bg-slate-200 m-10 rounded-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex-row">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
                {docInfo.title}
              </h1>
              <div className="text-xl pt-3">
                {currentStatus === "accepted" ? (
                  <p className="mt-1 leading-5 text-green-500 font-bold">
                    Accepted
                  </p>
                ) : currentStatus === "rejected" ? (
                  <p className="mt-1 leading-5 text-red-500 font-bold">
                    Rejected
                  </p>
                ) : (
                  <p className="mt-1 leading-5 text-yellow-500 font-bold">
                    Under-consideration
                  </p>
                )}
              </div>
            </div>
            <ul className="flex justify-start flex-wrap">
              {docInfo.attachments.map((item, idx) => (
                <li key={idx}>
                  <SvgComponent doc={item} />
                </li>
              ))}
            </ul>
          </div>
          <h3 className="text-sm font-semibold leading-6 text-gray-900 pt-3">
            {docInfo.description}
          </h3>
          {docInfo.signedBy.length === 0 ? null : (
            <div className="flex-row">
              <h2 className="text-sm font-normal leading-6 text-gray-900 pt-3">
                Till now this document has been signed by:
              </h2>
              <ul className="flex-row max-w-sm pt-3 items-start">
                {docInfo.signedBy.map((item, id) => (
                  <UserCard
                    key={id}
                    user={item}
                    active={item.versionurl !== ""}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
