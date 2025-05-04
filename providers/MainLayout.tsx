"use client";
import Modal from "@/app/Components/Modal/Modal";
import type React from "react";

import ProfileModal from "@/app/Components/Profile/ProfileModal";
import { useTasks } from "@/context/taskContext";

interface MainLayoutProps {
	children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
	const { isEditing, profileModal } = useTasks();
	return (
		<div className='main-layout flex-1 bg-[#EDEDED] dark:bg-gray-800 border-2 border-white dark:border-gray-700 rounded-none sm:rounded-[1.5rem] overflow-auto p-0 xs:p-2 sm:p-4'>
			{isEditing && <Modal />}
			{profileModal && <ProfileModal />}
			{children}
		</div>
	);
}

export default MainLayout;
