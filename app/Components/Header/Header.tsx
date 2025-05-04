"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user, logoutUser } = useUserContext();
  const { openModalForAdd, activeTasks, openProfileModal } = useTasks();

  const router = useRouter();

  const { name } = user;

  const userId = user._id;

  // Simple logout icon SVG
  const logoutIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M16 17l5-5m0 0l-5-5m5 5H9m4 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <header className='px-4 md:px-6 pl-14 my-2 md:my-4 w-full flex flex-col md:flex-row items-center justify-between bg-[#f9f9f9] gap-3 md:gap-0'>
      <div className='w-full md:w-auto'>
        <h1 className='text-base md:text-lg font-medium'>
          <span role='img' aria-label='wave'>👋</span>
          {userId ? `Hi, ${name}!` : "Welcome to Taskfyer"}
        </h1>
        <p className='text-xs md:text-sm'>
          {userId ? (
            <>
              You have{" "}
              <span className='font-bold text-[#3aafae]'>
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className='h-[45px] md:h-[50px] flex items-center gap-3 md:gap-4 lg:gap-[10.4rem] w-full md:w-auto justify-center'>
        <button
          className='px-3 md:px-4 lg:px-8 py-2 md:py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out text-xs md:text-sm lg:text-base'
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}>
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className='flex gap-2 md:gap-4 items-center'>
          <Link
            href='https://github.com/ahmednasser111'
            passHref
            target='_blank'
            rel='noopener noreferrer'
            className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6]'>
            {github}
          </Link>
          <button className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6]'>
            {moon}
          </button>
          {userId && (
            <button
              type='button'
              className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6]'
              onClick={openProfileModal}>
              {profile}
            </button>
          )}
          {userId && (
            <button
              type='button'
              className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6]'
              title='Logout'
              onClick={logoutUser}>
              {logoutIcon}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;