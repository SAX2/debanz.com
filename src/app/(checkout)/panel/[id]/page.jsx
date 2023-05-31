"use client";
import { useUserContext } from "@/app/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import domain from "@/app/config";

export default function page() {  
  const { user } = useUserContext()
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (!user.id) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (!user.id) {
          router.push('/panel/login');
        }
      } else {
        try {
          const response = await fetch(domain("/users/"), {
            method: "POST",
            body: JSON.stringify({token: user.token}),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            if (data) {
              router.push(`/panel/${data.id}/compras`)
            }
          } else {
            return router.push('/panel/login');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    
    checkUser();
  }, [])

  return null;
}
