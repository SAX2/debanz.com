"use client";
import { redirect } from "next/navigation";

export default function page() {  
  const user = localStorage.getItem('user_auth');
  if (user.length == 0) redirect('/panel/login');
  const userParsed = JSON.parse(user)
  if (!user) redirect('/panel/login');
  else redirect(`/panel/${userParsed.id}`);
}
