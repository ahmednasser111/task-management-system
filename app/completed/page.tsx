"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";

import type { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import TaskItem from "../Components/TaskItem/TaskItem";
import Filters from "../Components/Filters/Filters";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
	useRedirect("/login");

	const { openModalForAdd, priority, completedTasks, setPriority } = useTasks();

	const filtered = filteredTasks(completedTasks, priority);

	useEffect(() => {
		setPriority("all");
	}, []);

	return (
		<main className='pl-10 m-2 sm:m-6 h-full dark:bg-gray-800 dark:text-gray-100'>
			<div className='flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0'>
				<h1 className='text-2xl font-bold dark:text-white text-center'>Completed Tasks</h1>
				<Filters />
			</div>

			<motion.div
				className='pb-[2rem] mt-4 sm:mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 sm:gap-[1.5rem]'
				variants={container}
				initial='hidden'
				animate='visible'>
				{filtered.map((task: Task, i: number) => (
					<TaskItem
						key={i}
						task={task}
					/>
				))}
				<motion.button
					className='h-[10rem] sm:h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 dark:text-gray-400 border-dashed border-2 border-gray-400 dark:border-gray-600
          hover:bg-gray-300 dark:hover:bg-gray-700 hover:border-none transition duration-200 ease-in-out'
					onClick={openModalForAdd}
					variants={item}>
					Add New Task
				</motion.button>
			</motion.div>
		</main>
	);
}
