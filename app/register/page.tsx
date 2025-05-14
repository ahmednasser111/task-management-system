"use client";
import RegisterForm from "../Components/auth/RegisterForm/RegisterForm";
import useRedirect from "@/hooks/useUserRedirect";

function page() {
	useRedirect(true); // auth page
	return (
		<div className='auth-page w-full h-full flex justify-center items-center dark:bg-gray-800'>
			<RegisterForm />
		</div>
	);
}

export default page;
