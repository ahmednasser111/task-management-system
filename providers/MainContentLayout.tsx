"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const userId = useUserContext().user._id;
  return (
    <main
      className={`${
        userId ? "pr-0 sm:pr-[20rem]" : ""
      } pb-[1.5rem] flex flex-col sm:flex-row h-full w-full px-2 sm:px-0`}
    >
      {children}
    </main>
  );
}

export default MainContentLayout;
