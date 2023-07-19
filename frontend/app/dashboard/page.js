"use client";

import { useStore } from "@/store";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import ApprovalDashboard from "../components/ApprovalDashboard";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function Dashboard() {
  const position = useStore((state) => state.position);
  const [token, setDocs] = useStore((state) => [state.token, state.setDocs]);

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
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      refetch().catch((err) => {
        console.log(`[frontend]: ${err}`);
      });
    }
  }, []);

  return (
    <>
      {position === "None" && <UserDashboard />}
      {position === "Admin" && <AdminDashboard />}
      {(position === "Clark" || position === "HoD" || position === "DHoD") && (
        <ApprovalDashboard />
      )}
      {position === "Super Admin" && <SuperAdminDashboard />}
    </>
  );
}
