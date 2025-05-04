"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks, openProfileModal } = useTasks();

  const router = useRouter();

  const { name } = user;

  const userId = user._id;

  return (
		<header className='pl-14 px-2 sm:px-6 my-4 w-full flex flex-col sm:flex-row items-center justify-between bg-[#f9f9f9] gap-4 sm:gap-0'>
			<div className="w-full sm:w-auto">
				<h1 className='text-lg font-medium'>
					<span
						role='img'
						aria-label='wave'>
						👋
					</span>
					{userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
				</h1>
				<p className='text-sm'>
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
			<div className='h-[50px] flex items-center gap-4 sm:gap-[10.4rem] w-full sm:w-auto justify-end'>
				<button
					className='px-4 sm:px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out text-sm sm:text-base'
					onClick={() => {
						if (userId) {
							openModalForAdd();
						} else {
							router.push("/login");
						}
					}}>
					{userId ? "Add a new Task" : "Login / Register"}
				</button>

				<div className='flex gap-2 sm:gap-4 items-center'>
					<Link
						href='https://github.com/ahmednasser111'
						passHref
						target='_blank'
						rel='noopener noreferrer'
						className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'>
						{github}
					</Link>
					<button className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'>
						{moon}
					</button>
					<button
						type='button'
						className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
						onClick={openProfileModal}>
						{profile}
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
