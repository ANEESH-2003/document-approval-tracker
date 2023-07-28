"use client";
import UserCard from "../UserCard/page";
import { useState, Fragment } from "react";
import SvgComponent from "./svgComponent";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store";
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
export default function page() {
  const query = useSearchParams();
  const idx = query.get("idx");
  const Doc = useStore((state) => state.docs[idx]);
  const [currentStatus, setCurrentStatus] = useState(Doc.status || "");
  const PastReviewers = Doc.past;
  const Attachments = [];
  for (let i = 0; i < Doc.url.length; i++) {
    for (let j = 0; j < PastReviewers.length; j++) {
      if (Doc.url[i]._id === PastReviewers[j]._id) {
        PastReviewers[j].versionurl = Doc.url[i].doc;
      }
    }
    if (Doc.url[i].doc !== undefined) Attachments.push(Doc.url[i]);
  }

  return (
    <div className="min-h-screen capitalize">
      <main className="max-w-[95%] shadow-lg bg-slate-200 m-10 rounded-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex-row">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
                {Doc.title}
              </h1>
              <div className="text-2xl pt-3">
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
            <ul className="flex justify-start flex-wrap pt-3">
              {Attachments.map((item) => (
                <li key={item._id}>
                  <SvgComponent att={item} />
                </li>
              ))}
            </ul>
          </div>
          <h3 className="text-sm font-semibold leading-6 text-gray-900 pt-3">
            {Doc.description}
          </h3>
          {PastReviewers.length === 0 ? null : (
            <div className="flex-row">
              <h2 className="text-sm font-normal leading-6 text-gray-900 pt-3">
                Till now this document has been signed by:
              </h2>
              <ul className="flex-row max-w-sm pt-3 items-start">
                {PastReviewers.map((item) => (
                  <UserCard
                    key={item._id}
                    user={item}
                    active={item.versionurl != undefined}
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
