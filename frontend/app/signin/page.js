"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "react-query";
import { useStore } from "@/store";
import TopBar from "../TopBar/page";

const navigation = [
  {name: 'SignIn', href: '/../signin', current:true},
  {name: 'Team', href: '#', current: false},
  {name: 'Projects', href: '#', current: false},
  {name: 'Calendar', href: '#', current: false},
  {name: 'Reports', href: '#', current: false},
]

export default function Home() {
  const [wrongInfo, setWrongInfo] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useStore((state) => state.token);
  const login = useStore((state) => state.setToken);

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    return await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json());
  };

  const { data, error, refetch } = useQuery(
    ["login", email, password],
    () => handleLogin(email, password),
    { enabled: false },
  );

  useEffect(() => {
    if (data?.message === "success") {
      login(data.data.token, data.data.position);
      router.replace("/dashboard");
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign In</h1>
        </div>
      </header>
      <main className='max-w-[80%] shadow-lg bg-slate-200 mx-auto mt-4 pb-4 rounded-md'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {wrongInfo ? (
            <h5 className="text-red-600 font-bold text-center">
              Email/Password are incorrect
            </h5>
          ) : null}
            <p className='p-2 pt-5 font-bold text-center text-2xl '>SIGN IN</p>
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
        </div>
        <div className="mt-10 text-center">
              <button
                type="submit"
                className="mx-auto sm:w-[35%] w-[80%] bg-indigo-600 p-3 rounded-2xl font-bold text-white shadow-lg transform hover:scale-105 transition duration-100 hover:text-lime-200"
                onClick={authenticateFunction}
              >
                Sign in
              </button>
              <h5 className="text-center pt-2">
                Do not have an account?
                <Link href="/../usersignup" className="text-red-600 font-bold">
                  {" "}
                  Signup{" "}
                </Link>
              </h5>
            </div>
            </main>
    </div>
  );
}
