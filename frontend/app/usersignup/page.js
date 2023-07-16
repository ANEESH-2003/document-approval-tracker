"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "react-query";
import { useStore } from "@/store";

export default function Home() {
  const [wrongInfo, setWrongInfo] = useState(false);
  const [name, setName] = useState("Test1 Sample");
  const [phone, setPhone] = useState("7856123490");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();
  const token = useStore((state) => state.token);

  if (token) {
    router.replace("/dashboard");
  }

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
    console.log(data);
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
    <div
      className="flex min-h-screen flex-1 flex-row items-center justify-center px-6 py-12 lg:px-8"
      style={{
        backgroundImage: "url(/bgforsignup.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-blue-400 p-6 sm:mx-auto sm:w-full sm:max-w-sm rounded-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {wrongInfo ? (
            <h5 className="text-red-600 font-bold text-center">
              credentials are already in use
            </h5>
          ) : null}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            SIGN UP
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          </form>
        </div>
      </div>
    </div>
  );
}
