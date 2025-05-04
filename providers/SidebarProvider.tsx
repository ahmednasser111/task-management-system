"use client";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import { useUserContext } from "@/context/userContext";
import React from "react";

function SidebarProvider() {
  const { user } = useUserContext();
  if (!user || !user._id) {
    return null;
  }
  return <Sidebar />;
}

export default SidebarProvider;
