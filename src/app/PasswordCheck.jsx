"use client";
import { useRouter } from "next/navigation";

export default function PasswordCheck({ isActive }) {
  const router = useRouter()

  if (isActive) {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('is_verified')) return;
      return router.push('/password');
    } else return router.push('/password');
  }
  return;
}
