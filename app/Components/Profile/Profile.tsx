"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";

function Profile() {
	const { user } = useUserContext();
	const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();
	return (
		<div className='m-2 sm:m-6'>
			<div
				className='px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 dark:bg-gray-700/50 rounded-[0.8rem] hover:bg-[#E6E6E6]/50 dark:hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white dark:hover:border-gray-600'
				onClick={openProfileModal}>
				<div className='flex-shrink-0'>
					<Image
						src={user?.photo || "/placeholder.svg"}
						alt='avatar'
						width={50}
						height={50}
						className='rounded-full w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] object-cover'
						sizes='(max-width: 640px) 50px, 70px'
						priority
					/>
				</div>
				<div className='flex-1 min-w-0'>
					<h1 className='flex flex-col text-base sm:text-lg md:text-xl'>
						<span className='font-medium'>Hello,</span>
						<span className='font-bold truncate'>{user?.name}</span>
					</h1>
				</div>
			</div>

			<div className='mt-6 flex flex-col gap-8'>
				<div className='grid grid-cols-2 gap-4'>
					<div className='text-gray-400 dark:text-gray-300'>
						<p>Total Tasks:</p>
						<p className='pl-4 relative flex gap-2'>
							<span className='absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]'></span>
							<span className='font-medium text-4xl text-[#333] dark:text-white'>
								{tasks.length}
							</span>
						</p>
					</div>
					<div className='text-gray-400 dark:text-gray-300'>
						<p>In Progress:</p>
						<p className='pl-4 relative flex gap-2'>
							<span className='absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]'></span>
							<span className='font-medium text-4xl text-[#333] dark:text-white'>
								{activeTasks.length}
							</span>
						</p>
					</div>
					<div className='text-gray-400 dark:text-gray-300'>
						<p>Open Tasks:</p>
						<p className='pl-4 relative flex gap-2'>
							<span className='absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]'></span>
							<span className='font-medium text-4xl text-[#333] dark:text-white'>
								{activeTasks.length}
							</span>
						</p>
					</div>
					<div className='text-gray-400 dark:text-gray-300'>
						<p>Completed:</p>
						<p className='pl-4 relative flex gap-2'>
							<span className='absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]'></span>
							<span className='font-medium text-4xl text-[#333] dark:text-white'>
								{completedTasks.length}
							</span>
						</p>
					</div>
				</div>
			</div>
			<h3 className='mt-8 font-medium dark:text-white'>Activity</h3>
		</div>
	);
}

export default Profile;
