"use client";
import UserCard from "../UserCard/page";
import { useState, Fragment } from "react";
import SvgComponent from "./svgComponent";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store";

export default function page() {
  const query = useSearchParams();
  const idx = query.get("idx");
  const Doc = useStore((state) => state.docs[idx]);
  const [currentStatus, setCurrentStatus] = useState(Doc ? Doc.status : "");
  const PastReviewers = Doc ? Doc.past : [];
  const Attachments = [];

  if (Doc) {
    for (let i = 0; i < Doc.url.length; i++) {
      for (let j = 0; j < PastReviewers.length; j++) {
        if (Doc.url[i]._id === PastReviewers[j]._id) {
          PastReviewers[j].versionurl = Doc.url[i].doc;
        }
      }
      if (Doc.url[i].doc !== undefined) Attachments.push(Doc.url[i]);
    }
  }

  return (
    <div className="min-h-screen capitalize">
      <main className="max-w-[95%] shadow-lg bg-slate-200 m-10 rounded-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex-row">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
                {Doc ? Doc.title : ''}
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
            {Doc ? Doc.description : ''}
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
                    active={item.versionurl !== undefined}
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
