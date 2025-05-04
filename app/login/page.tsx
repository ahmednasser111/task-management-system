"use client";
import { useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";

function page() {
	return (
		<div className='auth-page w-full h-full flex justify-center items-center dark:bg-gray-800'>
			<LoginForm />
		</div>
	);
}

export default page;
