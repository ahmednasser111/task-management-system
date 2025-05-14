import { useTasks } from "@/context/taskContext";
import { edit, trash } from "@/utils/Icons";
import type { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
	task: Task;
}

function TaskItem({ task }: TaskItemProps) {
	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "low":
				return "text-green-500";
			case "medium":
				return "text-yellow-500";
			case "high":
				return "text-red-500";
			default:
				return "text-red-500";
		}
	};

	const { getTask, openModalForEdit, deleteTask, updateTask } = useTasks();
	const [showConfirm, setShowConfirm] = useState(false);
	const [isCompleting, setIsCompleting] = useState(false);

	const handleDelete = async () => {
		await deleteTask(task._id);
		setShowConfirm(false);
	};

	const handleToggleComplete = async () => {
		setIsCompleting(true);
		await updateTask({ ...task, completed: !task.completed });
		setIsCompleting(false);
	};

	return (
		<>
			<motion.div
				className={`h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] dark:bg-gray-800 rounded-lg border-2 border-white dark:border-gray-700 transition-opacity duration-300 ${
					task.completed ? "opacity-60" : ""
				}`}
				variants={item}>
				<div>
					<h4
						className={`font-bold text-2xl dark:text-white ${
							task.completed
								? "line-through text-gray-400 dark:text-gray-500"
								: ""
						}`}>
						{task.title}
					</h4>
					<p
						className={`dark:text-gray-300 ${
							task.completed
								? "line-through text-gray-400 dark:text-gray-500"
								: ""
						}`}>
						{task.description}
					</p>
				</div>
				<div className='mt-auto flex justify-between items-center'>
					<p className='text-sm text-gray-400 dark:text-gray-500'>
						{formatTime(task.createdAt)}
					</p>
					<p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
						{task.priority}
					</p>
					<div>
						<div className='flex items-center gap-3 text-gray-400 dark:text-gray-500 text-[1.2rem]'>
							<motion.button
								whileTap={{ scale: 0.85 }}
								className={`transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
									task.completed
										? "bg-green-100 text-green-600 dark:bg-green-900"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
								style={{ minWidth: 36, minHeight: 36 }}
								title={
									task.completed ? "Mark as Incomplete" : "Mark as Completed"
								}
								onClick={handleToggleComplete}
								disabled={isCompleting}
							>
								{task.completed ? (
									// Checkmark icon
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-green-400" />
										<path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9" />
									</svg>
								) : (
									// Empty circle icon
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
									</svg>
								)}
							</motion.button>
							<button
								className='text-[#00A1F1]'
								onClick={() => {
									getTask(task._id);
									openModalForEdit(task);
								}}>
								{edit}
							</button>
							<button
								className='text-[#F65314]'
								onClick={() => setShowConfirm(true)}>
								{trash}
							</button>
						</div>
					</div>
				</div>
			</motion.div>
			{/* Confirmation Modal */}
			{showConfirm && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
					<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center'>
						<p className='mb-4 text-lg font-semibold text-gray-800 dark:text-white text-center'>
							Are you sure you want to delete this task?
						</p>
						<div className='flex gap-4'>
							<button
								className='px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600'
								onClick={() => setShowConfirm(false)}>
								Cancel
							</button>
							<button
								className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
								onClick={handleDelete}>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default TaskItem;
