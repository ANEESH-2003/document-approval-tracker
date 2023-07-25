"use client";
import TopBar from "../TopBar/page";
import { Listbox, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import SvgComponent from "../document/svgComponent";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { useQuery } from "react-query";
import axios from "axios";

const navigation = [
  { name: "Dashboard", href: "/../dashboard", current: false },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: true },
  { name: "Issue Application", href: "/../IssueApplication" },
  { name: "Reports", href: "#", current: false },
];

export default function page() {
  const router = useRouter();
  const [state, setState] = useState({ selectedFile: null });
  const [active, setActive] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [selected, setSelected] = useState({ name: "None" });
  const [body] = useState(new FormData());

  const token = useStore((state) => state.token);

  const getAssignees = async (token) => {
    return await fetch("http://localhost:8080/api/users/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(`[frontend]: ${err}`);
      });
  };

  const { data, error, refetch } = useQuery(
    ["getAssign", token],
    () => getAssignees(token),
    { enabled: false },
  );

  const issueReq = async () => {
    if (title === "") {
      alert("Title cannot be empty");
    } else if (desc === "") {
      alert("Description cannot be empty");
    } else if (!selected) {
      alert("Assignee cannot be empty");
    } else {
      body.append("current", selected._id);
      body.append("title", title);
      body.append("desc", desc);
      body.append("department", selected.department);

      return await axios
        .post("http://localhost:8080/api/document/upload", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`[frontend]: ${err}`);
        });
    }
  };

  const {
    data: data1,
    error: error1,
    refetch: refetch1,
  } = useQuery(
    ["issue", token, title, desc, state, selected],
    () => issueReq(token, title, desc, state, selected),
    { enabled: false },
  );

  useEffect(() => {
    refetch().catch((err) => {
      console.log(`[frontend]: ${err}`);
    });
  }, []);

  useEffect(() => {
    if (data && data?.message === "success") {
      const temp = data.data.filter((item) => item.position === "Clark");
      setAssignee(temp);
    } else if (data && data?.message === "Error") {
      console.log(`[frontend]: ${data.errors}`);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(`[frontend]: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (data1 && data1?.message === "success") {
      router.back();
    } else if (data1 && data1?.message === "error") {
      console.log(`[frontend]: ${data1.data[Object.keys(data1.data)[0]]}`);
    }
  }, [data1]);

  useEffect(() => {
    if (error1) {
      console.log(`[frontend]: ${error1}`);
    }
  }, [error1]);

  const onFileChange = (event) => {
    setState({ selectedFile: event.target.files[0] });
    setActive(false);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    body.append("document", state.selectedFile, state.selectedFile.name);
    alert("Document uploaded successfully");
  };
  const issueButtonClick = () => {
    refetch1().catch((err) => {
      console.log(`[frontend]: ${err}`);
    });
  };

  return (
    <div className="min-h-full capitalize">
      <TopBar page="Issue Application" navigation={navigation} />
      <main className="max-w-[95%] shadow-lg bg-slate-200 m-10 rounded-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="p-2 pt-5 font-bold text-center text-2xl">
            Enter Application Information
          </p>
          <div className="mx-auto w-[80%] sm:w-[70%] mt-10">
            <p className="text-xs text-slate-600 font-bold">Title</p>
            <input
              type="text"
              name="Title"
              id="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-2 w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Title"
            />
          </div>
          <div className="mx-auto sm:w-[70%] w-[80%] mt-10">
            <p className="text-xs text-slate-600 font-bold">Description</p>
            <textarea
              id="description"
              className="px-2 w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mx-auto sm:w-[70%] w-[80%] mt-10">
            <p className="text-xs mx-auto text-slate-600 font-bold mb-0">
              Choose the assignee
            </p>
            <Listbox value={selected} onChange={setSelected} className="mb-10">
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {selected.name}{" "}
                    {!selected.position ? null : <>({selected.position})</>}
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
                    {assignee.map((person) => (
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
            <div className="flex-col items-center bg-white w-[100%] mt-10 p-4 mx-auto mt-5 h-[50%] border-dotted border-4 border-blue-600 rounded-xl">
              <div className="mx-auto text-center">
                <input
                  type="file"
                  onChange={onFileChange}
                  className="mx-auto"
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
                  disabled={active}
                >
                  Upload
                </button>
              </div>
            </div>
            <button
              type="submit"
              onClick={issueButtonClick}
              className="mx-auto w-[100%] mt-10 bg-lime-400 rounded-lg shadow-lg transform hover:scale-105 transition duration-100 hover:text-blue-200"
            >
              <h2 className="text-lg font-bold p-2 text-white">Issue</h2>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
