"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, logoutIcon, moon, profile, sun as sunIcon } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function Header() {
	const { user, logoutUser } = useUserContext();
	const { openModalForAdd, activeTasks, openProfileModal } = useTasks();

	const router = useRouter();

	const { name } = user;

	const userId = user._id;

	const [darkMode, setDarkMode] = useState(false);

	// On component mount, load preference from localStorage
	useEffect(() => {
		const savedMode = localStorage.getItem("theme");
		if (savedMode === "dark") {
			setDarkMode(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [darkMode]);

	return (
		<header className='px-4 md:px-6 pl-14 my-2 md:my-4 w-full flex flex-col md:flex-row items-center justify-between bg-[#f9f9f9] dark:bg-gray-800 gap-3 md:gap-0'>
			<div className='w-full md:w-auto'>
				<h1 className='text-base md:text-lg font-medium text-black dark:text-white'>
					<span
						role='img'
						aria-label='wave'>
							👋
					</span>
					{userId ? `Hi, ${name}!` : "Welcome to Taskfyer"}
				</h1>
				<p className='text-xs md:text-sm text-gray-700 dark:text-gray-300'>
					{userId ? (
						<>
							You have{" "}
							<span className='font-bold text-[#3aafae] dark:text-[#5eead4]'>
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
					className='px-3 md:px-4 lg:px-8 py-2 md:py-3 bg-[#3aafae] dark:bg-[#0891b2] text-white rounded-[50px]
          hover:bg-[#00A1F1] dark:hover:bg-[#0ea5e9] hover:text-white transition-all duration-200 ease-in-out text-xs md:text-sm lg:text-base'
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
						className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 dark:text-purple-300 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6] dark:border-[#27272a]'>
						{github}
					</Link>
					<button
						className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 dark:text-purple-300 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6] dark:border-[#27272a]'
						onClick={() => setDarkMode((prev) => !prev)}
						title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
						{darkMode ? moon : sunIcon}
					</button>
					{userId && (
						<button
							type='button'
							className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 dark:text-purple-300 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6] dark:border-[#27272a]'
							onClick={openProfileModal}>
							{profile}
						</button>
					)}
					{userId && (
						<button
							type='button'
							className='h-[35px] w-[35px] md:h-[40px] md:w-[40px] text-purple-500 dark:text-purple-300 rounded-full flex items-center justify-center text-base md:text-lg border-2 border-[#E6E6E6] dark:border-[#27272a]'
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