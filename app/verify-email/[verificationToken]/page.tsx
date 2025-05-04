"use client";
import { useUserContext } from "@/context/userContext";

interface Props {
	params: {
		verificationToken: string;
	};
}

function page({ params }: Props) {
	const { verificationToken } = params;

	const { verifyUser } = useUserContext();

	return (
		<div className='auth-page flex flex-col justify-center items-center dark:bg-gray-800'>
			<div className='bg-white dark:bg-gray-800 flex flex-col justify-center gap-[1rem] px-[4rem] py-[2rem] rounded-md dark:text-gray-100'>
				<h1 className='text-[#999] dark:text-gray-300 text-[2rem]'>
					Verify Your Account
				</h1>
				<button
					className='px-4 py-2 self-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
					onClick={() => {
						verifyUser(verificationToken);
					}}>
					Verify
				</button>
			</div>
		</div>
	);
}

export default page;
