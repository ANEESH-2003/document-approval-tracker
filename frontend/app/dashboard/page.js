"use client";

import { useStore } from "@/store";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import ApprovalDashboard from "../components/ApprovalDashboard";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Dashboard() {
  const [token, setDocs] = useStore((state) => [state.token, state.setDocs]);
  const position = useStore((state) => state.position);
  const router = useRouter();
  const reqs = useStore((state) => state.docs);

  const handleReq = async (token) => {
    return await fetch("http://localhost:8080/api/document/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const { data, error, refetch } = useQuery(
    ["login", token],
    () => handleReq(token),
    { enabled: false },
  );

  useEffect(() => {
    if (data && data?.message === "success") {
      setDocs(data.data);
    } else if (data && data?.errors) {
      // TODO: remove this two and manage the errors
      console.log(data.errors);
      alert(data.errors);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    refetch().catch((err) => {
      console.log(`[frontend]: ${err}`);
    });
  }, []);

  if (!token) {
    router.replace("/signin");
  }

  if (position === "None") {
    return <UserDashboard />;
  } else if (position === "Admin") {
    return <AdminDashboard />;
  } else if (
    position === "Clark" ||
    position === "HoD" ||
    position === "DHoD"
  ) {
    return <ApprovalDashboard />;
  } else if (position === "Super Admin") {
    return <SuperAdminDashboard />;
  } else {
    return <></>;
  }
}
