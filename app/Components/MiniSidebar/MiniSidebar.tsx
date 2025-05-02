"use client";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function MiniSidebar() {
  const pathname = usePathname();
  const { deleteAllTasks } = useTasks();
  const { user } = useUserContext();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = React.useState(false);

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const handleDeleteAll = () => {
    if (!user || !user._id) {
      router.push("/login");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    await deleteAllTasks();
    setShowConfirm(false);
  };
  const handleCancel = () => setShowConfirm(false);

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];
  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem]">
        <Image src="/logo.png" width={28} height={28} alt="logo" />
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>

              {/* Hover Tooltip */}
              <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-[1.5rem]">
          <button
            className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31]  p-2 rounded-full"
            onClick={handleDeleteAll}
          >
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
              <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
                <p className="mb-4 text-center">Are you sure you want to delete all tasks?</p>
                <div className="flex gap-4">
                  <button
                    className="bg-[#EB4E31] text-white px-4 py-2 rounded"
                    onClick={handleConfirm}
                  >
                    Yes, Delete All
                  </button>
                  <button
                    className="bg-gray-200 px-4 py-2 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
