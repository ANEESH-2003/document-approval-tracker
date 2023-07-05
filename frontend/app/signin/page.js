'use client'
import { useState} from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [wronginfo,setwronginfo]=useState(false);
  const router = useRouter();
  const authenticatefunction=()=>{
    /* if server says incorrect info */
    setwronginfo(value=>!value);
    /* else if correct */
    router.push('/../dashboard');
  }
  return (
    <div className="flex min-h-screen flex-1 flex-row items-center justify-center px-6 py-12 lg:px-8" style={{backgroundImage:'url(/bgforlogin.jpg)',backgroundSize:'cover'}}>
      <div className="bg-blue-400 p-6 sm:mx-auto sm:w-full sm:max-w-sm rounded-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {wronginfo?<h5 className="text-red-600 font-bold text-center">Email/Password are incorrect</h5>:null}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            SIGN IN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={authenticatefunction}
              >
                Sign in
              </button>
              <h5 className="text-center pt-2">Do not have an account?<Link href="/../usersignup" className="text-red-600 font-bold"> Sign up</Link></h5>
            </div>
          </form>
        </div>
        </div>
      </div>
  )
}