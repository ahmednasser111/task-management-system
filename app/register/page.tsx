"use client";
import RegisterForm from "../Components/auth/RegisterForm/RegisterForm";

function page() {
	return (
		<div className='auth-page w-full h-full flex justify-center items-center dark:bg-gray-800'>
			<RegisterForm />
		</div>
	);
}

export default page;
