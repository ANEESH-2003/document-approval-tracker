"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useStore} from "@/store";

export default function page() {
  const router = useRouter();
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/signin');
    }
  }, []);

  return <div></div>;
}
