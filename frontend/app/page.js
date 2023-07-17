"use client";

import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

export default function page() {
  const router = useRouter();
  const [token, logout] = useStore((state) => [state.token, state.logout]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const redirect = () => {
    logout();
    router.push("/dashboard");
  }

  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      if (decoded) {
        if (decoded.exp * 1000 < Date.now()) {
          redirect();
        }
      }

      router.push("/signin");
    } else {
      redirect();
    }
  }, []);

  return <div></div>;
}
