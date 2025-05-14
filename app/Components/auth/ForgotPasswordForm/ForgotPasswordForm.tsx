"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup.string().email("Enter a valid email.").required("Email is required."),
});

function ForgotPasswordForm() {
	const { forgotPasswordEmail } = useUserContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: any) => {
		await forgotPasswordEmail(data.email);
		reset();
	};

	return (
		<form className='relative m-[2rem] px-10 py-14 rounded-lg bg-white dark:bg-gray-800 max-w-[520px] w-full dark:text-gray-100' onSubmit={handleSubmit(onSubmit)}>
			<div className='relative z-10'>
				<h1 className='mb-2 text-center text-[1.35rem] font-medium dark:text-white'>
					Enter email to reset password
				</h1>
				<div className='mt-[1rem] flex flex-col'>
					<label
						htmlFor='email'
						className='mb-1 text-[#999] dark:text-gray-400'>
						Email
					</label>
					<input
						type='email'
						id='email'
						{...register("email")}
						placeholder='johndoe@gmail.com'
						className='px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600'
					/>
					{errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
				</div>
				<div className='flex'>
					<button
						type='submit'
						className='mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors'>
						Reset Password
					</button>
				</div>
			</div>
			<img
				src='/flurry.png'
				alt=''
			/>
		</form>
	);
}

export default ForgotPasswordForm;
