'use client';

import {useRouter} from "next/navigation";
import {useStore} from "@/store";
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import ApprovalDashboard from "../components/ApprovalDashboard";
import SuperAdminDashboard from "../components/SuperAdminDashboard";

export default function Dashboard() {
  const token = useStore(state => state.token);
  const position = useStore((state) => state.position);

  if (!token) {
    router.replace('/signin');
  }

  if (position === 'None') {
    return (
      <UserDashboard />
    )
  } else if (position === 'Admin') {
    return (
      <AdminDashboard />
    )
  } else if (position === 'Clark' || position === 'HoD' || position === 'DHoD') {
    return (
      <ApprovalDashboard />
    )
  } else {
    return (
      <SuperAdminDashboard />
    )
  }
}
