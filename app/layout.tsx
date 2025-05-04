import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { Inter } from "next/font/google";
import MainContentLayout from "@/providers/MainContentLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import MainLayout from "@/providers/MainLayout";
import GTMInitialiser from "@/providers/GTMInitialiser";
import MiniSidebar from "./Components/MiniSidebar/MiniSidebar";
import Header from "./Components/Header/Header";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Taskfyer",
	description: "Task Management System App",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang='en'
			className='dark:bg-gray-800'>
			<head>
				<GTMInitialiser />
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'
					integrity='sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'
				/>
				<link
					rel='icon'
					href='/favicon.png'
					type='image/png'
				/>
			</head>
			<body
				className={`${inter.className} dark:bg-gray-800 dark:text-gray-100`}>
				<UserProvider>
					<Toaster position='top-center' />

					<div className='h-full flex overflow-hidden dark:bg-gray-800'>
						<MiniSidebar />
						<div className='flex-1 flex flex-col dark:bg-gray-800'>
							<Header />
							<MainContentLayout>
								<MainLayout>{children}</MainLayout>
								<SidebarProvider />
							</MainContentLayout>
						</div>
					</div>
				</UserProvider>
			</body>
		</html>
	);
}
