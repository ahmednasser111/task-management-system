"use client";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import useRedirect from "@/hooks/useUserRedirect";

function page() {
	useRedirect(true); // auth page
	return (
		<div className='auth-page w-full h-full flex justify-center items-center dark:bg-gray-800'>
			<LoginForm />
		</div>
	);
}

export default page;
