"use client"
import { useUserContext } from "@/context/userContext"
import type React from "react"

interface MainContentLayoutProps {
  children: React.ReactNode
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const { user } = useUserContext()
  const userId = user && user._id
  return (
    <main
      className={`${
        userId ? "pr-0 sm:pr-[20rem] pl-0 md:pl-[5rem]" : ""
      } pb-[1.5rem] flex flex-col sm:flex-row h-full w-full px-2 sm:px-0 dark:bg-gray-800`}
    >
      {children}
    </main>
  )
}

export default MainContentLayout
