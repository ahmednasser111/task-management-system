"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup.string().min(2, "Name must be at least 2 characters.").required("Name is required."),
	email: yup.string().email("Enter a valid email.").required("Email is required."),
	password: yup.string().min(6, "Password must be at least 6 characters.").required("Password is required."),
});

function RegisterForm() {
	const { registerUser } = useUserContext();
	const [showPassword, setShowPassword] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: any, e?: React.BaseSyntheticEvent) => {
		// mimic the signature expected by registerUser
		await registerUser({
			preventDefault: () => {},
			target: { value: "" },
		}, data);
		reset();
	};

	const togglePassword = () => setShowPassword((prev) => !prev);

	return (
		<form
			className='relative m-[2rem] px-10 py-14 rounded-lg bg-white dark:bg-gray-800 w-full max-w-[520px] dark:text-gray-100'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='relative z-10'>
				<h1 className='mb-2 text-center text-[1.35rem] font-medium dark:text-white'>
					Register for an Account
				</h1>
				<p className='mb-8 px-[2rem] text-center text-[#999] dark:text-gray-400 text-[14px]'>
					Create an account. Already have an account?{" "}
					<a
						href='/login'
						className='font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300'>
						Login here
					</a>
				</p>
				<div className='flex flex-col'>
					<label
						htmlFor='name'
						className='mb-1 text-[#999] dark:text-gray-400'>
						Full Name
					</label>
					<input
						type='text'
						id='name'
						{...register("name")}
						className='px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600'
						placeholder='John Doe'
					/>
					{errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
				</div>
				<div className='mt-[1rem] flex flex-col'>
					<label
						htmlFor='email'
						className='mb-1 text-[#999] dark:text-gray-400'>
						Email
					</label>
					<input
						type='text'
						id='email'
						{...register("email")}
						className='px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600'
						placeholder='johndoe@gmail.com'
					/>
					{errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
				</div>
				<div className='relative mt-[1rem] flex flex-col'>
					<label
						htmlFor='password'
						className='mb-1 text-[#999] dark:text-gray-400'>
						Password
					</label>
					<input
						type={showPassword ? "text" : "password"}
						id='password'
						{...register("password")}
						className='px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600'
						placeholder='***************'
					/>
					<button
						type='button'
						className='absolute p-1 right-4 top-[43%] text-[22px] text-[#999] dark:text-gray-400 opacity-45'
						onClick={togglePassword}>
						{showPassword ? (
							<i className='fas fa-eye-slash'></i>
						) : (
							<i className='fas fa-eye'></i>
						)}
					</button>
					{errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
				</div>

				<div className='flex'>
					<button
						type='submit'
						className='mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors'>
						Register Now
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

export default RegisterForm;
