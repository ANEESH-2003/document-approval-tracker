"use client";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const RouteGuard = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [token, logout] = useStore((state) => [state.token, state.logout]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const redirect = () => {
    logout();
    router.push(path === "/usersignup" ? "/usersignup" : "/signin");
  };

  useEffect(() => {
    if (!token && path !== "/usersignup") {
      router.replace("/signin");
    } else {
      const decoded = parseJwt(token);
      if (decoded) {
        if (decoded.exp * 1000 < Date.now()) {
          alert("Token expired");
          redirect();
        }
      } else {
        redirect();
      }
    }

    setAuthorized(true);
  }, []);

  return <>{authorized && children}</>;
};
