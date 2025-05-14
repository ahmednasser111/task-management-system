"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
	currentPassword: yup.string().required("Current password is required"),
	newPassword: yup
		.string()
		.required("New password is required")
		.min(6, "New password must be at least 6 characters"),
});

function ChangePasswordForm() {
	const { changePassword } = useUserContext();

	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: any) => {
		await changePassword(data.currentPassword, data.newPassword);
		reset();
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<form
			className='ml-0 mt-0 m-[2rem] px-10 py-14 rounded-lg bg-white dark:bg-gray-800 max-w-[520px] w-full dark:text-gray-100'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='relative z-10'>
				<h1 className='mb-2 text-center text-[1.35rem] font-medium dark:text-white'>
					Reset Your Password!
				</h1>
				<div className='relative mt-[1rem] flex flex-col'>
					<label
						htmlFor='currentPassword'
						className='mb-1 text-[#999] dark:text-gray-400'>
						Current Password
					</label>
					<input
						type={showPassword ? "text" : "password"}
						{...register("currentPassword")}
						id='currentPassword'
						name='currentPassword'
						placeholder='*********'
						className='px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600'
					/>
					<button
						className='absolute p-1 right-4 top-[43%] text-[22px] text-[#999] dark:text-gray-400 opacity-45'
						onClick={togglePassword}
						type='button'>
						{showPassword ? (
							<i className='fas fa-eye-slash'></i>
						) : (
							<i className='fas fa-eye'></i>
						)}
					</button>
					{errors.currentPassword && (
						<span className="text-red-500 text-sm mt-1">{errors.currentPassword.message as string}</span>
					)}
				</div>
				<div className='relative mt-[1rem] flex flex-col'>
					<label
						htmlFor='newPassword'
						className='mb-1 text-[#999] dark:text-gray-400'>
						New Password
					</label>
					<input
						type={showPassword ? "text" : "password"}
						{...register("newPassword")}
						id='newPassword'
						name='newPassword'
						placeholder='*********'
						className='px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600'
					/>
					<button
						className='absolute p-1 right-4 top-[43%] text-[22px] text-[#999] dark:text-gray-400 opacity-45'
						onClick={togglePassword}
						type='button'>
						{showPassword ? (
							<i className='fas fa-eye-slash'></i>
						) : (
							<i className='fas fa-eye'></i>
						)}
					</button>
					{errors.newPassword && (
						<span className="text-red-500 text-sm mt-1">{errors.newPassword.message as string}</span>
					)}
				</div>
				<div className='flex'>
					<button
						type='submit'
						disabled={isSubmitting}
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

export default ChangePasswordForm;
