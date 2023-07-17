"use client";
import { useRouter } from "next/navigation";
import TopBar from "../TopBar/page";

const navigation = [
  { name: "Dashboard", href: "/../SuperAdminDashboard" },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];

export default function page() {
  const router = useRouter();
  const addButtonClick = () => {
    /* tell the server */
    router.refresh();
  };
  const removeButtonClick = () => {
    /* tell the server */
    router.refresh();
  };
  return (
    <div className="min-h-full">
      <TopBar page="AdminDashboard" navigation={navigation} />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Super Admin Dashboard
          </h1>
        </div>
      </header>
      <main className="max-w-[80%] shadow-lg bg-slate-200 mx-auto mt-4 pb-4 rounded-md">
        <p className="p-2 pt-5 font-bold text-center text-2xl">
          Enter Admin Information
        </p>
        <div className="flex flex-col sm:flex-row justify-around ">
          <div className="mx-auto sm:w-[35%] w-[80%]">
            <p className="text-xs text-slate-600 font-bold">First Name</p>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" First Name"
            />
          </div>
          <div className="mx-auto sm:w-[35%] w-[80%] pt-10 sm:pt-0">
            <p className="text-xs text-slate-600 font-bold">Last Name</p>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Last Name"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-around mt-10">
          <div className="mx-auto sm:w-[35%] w-[80%]">
            <p className="text-xs text-slate-600 font-bold">E-mail</p>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" E-mail"
            />
          </div>
          <div className="mx-auto sm:w-[35%] w-[80%] pt-10 sm:pt-0">
            <p className="text-xs text-slate-600 font-bold">Department Name</p>
            <input
              type="text"
              name="Designation"
              id="Designation"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Department Name"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-around mt-10">
          <div className="mx-auto sm:w-[35%] w-[80%]">
            <p className="text-xs text-slate-600 font-bold">Password</p>
            <input
              type="text"
              name="password"
              id="password"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Password"
            />
          </div>
          <div className="mx-auto sm:w-[35%] w-[80%] pt-10 sm:pt-0">
            <p className="text-xs text-slate-600 font-bold">Confirm-Password</p>
            <input
              type="text"
              name="confirmpassword"
              id="confirmpassword"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Confirm Password"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-around mt-10">
          <button
            className="mx-auto sm:w-[35%] w-[80%] bg-lime-500 p-3 rounded-2xl font-bold text-white shadow-lg transform hover:scale-105 transition duration-100 hover:text-lime-200"
            onClick={addButtonClick}
          >
            Add Admin
          </button>
          <button
            className="mx-auto sm:w-[35%] w-[80%] mt-10 sm:mt-0 bg-red-500 p-3 rounded-2xl font-bold text-white shadow-lg transform hover:scale-105 transition duration-100 hover:text-red-200"
            onClick={removeButtonClick}
          >
            Remove Admin
          </button>
        </div>
      </main>
    </div>
  );
}
