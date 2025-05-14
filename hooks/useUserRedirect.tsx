"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (authPage: boolean = false) => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (authPage) {
      // If on auth page and logged in, redirect to root
      if (user && user.email) {
        router.push("/");
      }
    } else {
      // If on protected page and not logged in, redirect to login
      if (!user || !user.email) {
        router.push("/login");
      }
    }
  }, [user, loading, authPage, router]);
};

export default useRedirect;
