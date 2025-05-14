"use cleint";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { user, loading } = useUserContext();
  const router = useRouter();
  
  useEffect(() => {
    if (!user || !user.email) {
      router.push(redirect);
    }
    else if (user && user.email && redirect === "/login") {
      router.push("/");
    }
    else if (loading) {
      return;
    }
  }, [user, redirect, router]);
};

export default useRedirect;
