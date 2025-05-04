import React from "react";
import ForgotPasswordForm from "../Components/auth/ForgotPasswordForm/ForgotPasswordForm";

function page() {
	return (
		<div className='auth-page w-full h-full flex justify-center items-center dark:bg-gray-800'>
			<ForgotPasswordForm />
		</div>
	);
}

export default page;
