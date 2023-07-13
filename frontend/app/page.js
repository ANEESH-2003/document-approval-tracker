'use client';

import React from 'react'
import {useRouter} from 'next/navigation'
import {useStore} from "@/store";

export default function page() {
  const router = useRouter();
  const token = useStore((state) => state.token);

  if (token) {
    router.push('/signin');
  } else {
    router.push('/dashboard');
  }

  return (
    <div>
    </div>
  )
};
