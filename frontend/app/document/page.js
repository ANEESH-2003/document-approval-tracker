"use client";
import TopBar from "../TopBar/page";
import UserCard from "../UserCard/page";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import SvgComponent from "./svgComponent";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store";

const navigation = [
  { name: "Dashboard", href: "/../dashboard" },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
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
  const router = useSearchParams();
  const idx = router.get("idx");
  const Doc = useStore((state) => state.docs[idx]);
  const [currentStatus, setCurrentStatus] = useState(Doc.status);
  const [selected, setSelected] = useState({ name: "None", position: "" });
  const [Active, setActive] = useState(true);

  const acceptButtonClick = () => {
    setActive(!Active);
    setCurrentStatus("accepted");
  };
  const rejectButtonClick = () => {
    setActive(!Active);
    setCurrentStatus("rejected");
  };
  const [state, setState] = useState({ selectedFile: null });
  const [active, setActive1] = useState(false);
  const onFileChange = (event) => {
    setState({ selectedFile: event.target.files[0] });
    setActive1((a) => !a);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("document", state.selectedFile, state.selectedFile.name);
    formData.append();
    console.log(state.selectedFile);

    // axios.post("api/uploadfile", formData);
  };

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
    <div className="min-h-full capitalize">
      <TopBar page="Dashboard" navigation={navigation} />
      <main className="max-w-[95%] shadow-lg bg-slate-200 m-10 rounded-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex-row">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 ">
                {Doc.title}
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
          <div className="flex flex-wrap justify-between">
            <div className="sm:w-[40%] w-[100%]">
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
              <p className="text-sm font-normal leading-6 text-gray-900 pt-3 w-[100%]">
                Whom should you further assign this complaint to:
              </p>
              <Listbox
                value={selected.name}
                onChange={setSelected}
                className="w-[100%]"
              >
                <div className="relative mt-1 pt-3">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selected.name}{" "}
                      {selected.position === "" ? null : (
                        <>({selected.position})</>
                      )}
                    </span>
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
                      {Doc.eligible.map((person) => (
                        <Listbox.Option
                          key={person._id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="sm:w-[40%] w-[100%] flex-col self-center items-center bg-white p-4 mt-5 h-[50%] border-dotted border-4 border-blue-600 rounded-xl ">
              <div className="mx-auto text-center">
                <input
                  type="file"
                  onChange={onFileChange}
                  className="mx-auto"
                  disabled={!Active}
                />
              </div>
              <div className="mx-auto text-center">
                {state.selectedFile ? (
                  <>
                    <h2 className="pt-3 text-slate-600 font-bold">
                      File Details:
                    </h2>
                    <p className="text-slate-600 font-bold">
                      File Name: {state.selectedFile.name}
                    </p>
                    <p className="text-slate-600 font-bold">
                      File Type: {state.selectedFile.type}
                    </p>
                    <p className="text-slate-600 font-bold">
                      Last Modified:{" "}
                      {state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="mx-auto text-center">
                <button
                  className="mx-auto mt-10 sm:w-[35%] w-[90%] bg-blue-500 p-3 rounded-2xl font-bold text-white shadow-lg transform hover:scale-105 transition duration-100 hover:text-blue-200"
                  onClick={onFileUpload}
                  disabled={!active || !Active}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-[100%] pt-2">
            {currentStatus === "rejected" ? (
              <></>
            ) : (
              <button
                type="submit"
                onClick={acceptButtonClick}
                className="bg-lime-200 mt-3 w-[40%] rounded-lg"
                disabled={!Active}
              >
                <h2 className="text-lg font-bold p-2 text-lime-700">
                  {currentStatus === "accepted" ? "Accepted" : "Accept"}
                </h2>
              </button>
            )}
            {currentStatus === "accepted" ? (
              <></>
            ) : (
              <button
                type="submit"
                onClick={rejectButtonClick}
                className="bg-red-200 mt-3 w-[40%] rounded-lg"
                disabled={!Active}
              >
                <h2 className="text-lg font-bold p-2 text-red-700">
                  {currentStatus === "rejected" ? "Rejected" : "Reject"}
                </h2>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
