'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function page() {
  const router = useRouter();
  return (
    <div>
      {router.push('/../signin')}
    </div>
  )
}
