"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "react-query";
import TopBar from "../TopBar/page";

const navigation = [
  {name: 'SignUp', href: '/../usersignup', current:true},
  {name: 'Team', href: '#', current: false},
  {name: 'Projects', href: '#', current: false},
  {name: 'Calendar', href: '#', current: false},
  {name: 'Reports', href: '#', current: false},
]

export default function Home() {
  const [wrongInfo, setWrongInfo] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleSignup = async (name, email, phone, password, confirm) => {
    return await fetch("http://localhost:8080/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password,
        confirmPassword: confirm,
      }),
    }).then((res) => res.json());
  };

  const { data, error, refetch } = useQuery(
    ["login", name, email, phone, password, confirm],
    () => handleSignup(name, email, phone, password, confirm),
    { enabled: false },
  );

  useEffect(() => {
    if (data?.message === "success") {
      router.replace("/signin");
    } else if (data?.message === "error" && data?.errors) {
      setWrongInfo((value) => !value);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const authenticateFunction = (e) => {
    e.preventDefault();
    refetch().catch((err) => {
      console.log("[frontend]: ", err);
      alert(err);
    });
  };

  return (
    <div className="min-h-full">
      {/* change the topbar so it doesn't show the username in sign in and sign out */}
      <TopBar page="AdminDashboard" navigation={navigation} />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign Up</h1>
        </div>
      </header>
      <main className='max-w-[80%] shadow-lg bg-slate-200 mx-auto mt-4 pb-4 rounded-md'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {wrongInfo ? (
              <h5 className="text-red-600 font-bold text-center">
                credentials are already in use
              </h5>
            ) : null}
            <p className='p-2 pt-5 font-bold text-center text-2xl '>SIGN UP</p>
          </div>
          <div className='flex flex-col sm:flex-row justify-around '>
          <div className='mx-auto sm:w-[35%] w-[80%]'>
            <p className='text-xs text-slate-600 font-bold'>Name</p>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-around mt-10'>
          <div className='mx-auto sm:w-[35%] w-[80%]'>
            <p className='text-xs text-slate-600 font-bold'>E-mail</p>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mx-auto sm:w-[35%] w-[80%] pt-10 sm:pt-0'>
            <p className='text-xs text-slate-600 font-bold'>Contact</p>
            <input
              type="number"
              name="mobile"
              id="mobile"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-around mt-10'>
          <div className='mx-auto sm:w-[35%] w-[80%]'>
            <p className='text-xs text-slate-600 font-bold'>Password</p>
            <input
              type="text"
              name="password"
              id="password"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mx-auto sm:w-[35%] w-[80%] pt-10 sm:pt-0'>
            <p className='text-xs text-slate-600 font-bold'>Confirm-Password</p>
            <input
              type="text"
              name="confirmpassword"
              id="confirmpassword"
              className="w-full rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-10 text-center">
              <button
                type="submit"
                className="mx-auto sm:w-[35%] w-[80%] bg-indigo-600 p-3 rounded-2xl font-bold text-white shadow-lg transform hover:scale-105 transition duration-100 hover:text-lime-200"
                onClick={authenticateFunction}
              >
                Sign up
              </button>
              <h5 className="text-center pt-2">
                Already have an account?
                <Link href="/.." className="text-red-600 font-bold">
                  {" "}
                  Sign in
                </Link>
              </h5>
            </div>
        </main>
    </div>
  );
}
