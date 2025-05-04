"use client"
import IconCheck from "@/public/icons/IconCheck"
import IconDeleteAll from "@/public/icons/IconDeleteAll"
import IconFileCheck from "@/public/icons/IconFileCheck"
import IconGrid from "@/public/icons/IconGrid"
import IconStopwatch from "@/public/icons/IconStopwatch"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTasks } from "@/context/taskContext"
import { useUserContext } from "@/context/userContext"

function MiniSidebar() {
  const { user } = useUserContext()
  const { deleteAllTasks } = useTasks()
  const pathname = usePathname()
  const [showConfirm, setShowConfirm] = useState(false)

  // If user is not logged in, don't render the sidebar
  if (!user || !user._id) {
    return null
  }

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a"
  }

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
  ]

  const handleDeleteAll = async () => {
    await deleteAllTasks()
    setShowConfirm(false)
  }

  return (
    <div className="fixed left-0 top-0 h-screen z-50 basis-[5rem] flex flex-col bg-[#f9f9f9] dark:bg-gray-800 sm:static sm:h-auto shadow-md">
      <div className="flex items-center justify-center h-[5rem] sm:h-[3rem]">
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="w-10 h-10 sm:w-8 sm:h-8 object-contain"
          priority
        />
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

        <div className="mb-[1.5rem] flex justify-center sm:justify-end">
          <button
            className="w-10 h-10 flex justify-center items-center p-2 rounded-full sm:w-8 sm:h-8"
            onClick={() => setShowConfirm(true)}
          >
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white text-center">
              Are you sure you want to delete all tasks?
            </p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDeleteAll}>
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MiniSidebar
