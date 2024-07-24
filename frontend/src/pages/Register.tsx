import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api/auth'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaEye,
    FaEyeSlash,
    FaExclamationCircle,
    FaArrowLeft,
} from 'react-icons/fa'

export type RegisterFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

const Register: React.FC = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<RegisterFormData>()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const passwordValue = watch('password')
    const confirmPasswordValue = watch('confirmPassword')

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            toast.success('Registration successful!')
            await queryClient.invalidateQueries('checkToken')
            navigate('/')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <div className="flex h-screen lg:h-auto overflow-auto">
            {/* Container for Form and Image */}
            <div className="flex w-full">
                {/* Left: Registration Form */}
                <div className="w-full lg:w-1/2 bg-white p-8 lg:p-36 md:p-20 sm:p-10 flex flex-col justify-center relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 p-2 text-blue-500 hover:text-blue-700"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-semibold mb-4">
                        Create an Account
                    </h1>
                    <h2 className="text-lg mb-4 text-gray-400">
                        Enter details to create your account
                    </h2>
                    <form
                        className="flex flex-col space-y-9"
                        onSubmit={onSubmit}
                    >
                        {/* First Name Input */}
                        <div className="relative">
                            <input
                                type="text"
                                id="firstName"
                                className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none ${
                                    errors.firstName
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:border-blue-500'
                                }`}
                                {...register('firstName', {
                                    required: 'First name is required',
                                })}
                                onBlur={() => trigger('firstName')}
                            />
                            <label
                                htmlFor="firstName"
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                    errors.firstName
                                        ? 'text-red-500'
                                        : 'text-gray-500 peer-focus:text-blue-500'
                                } bg-white px-1 z-10 ${
                                    watch('firstName')
                                        ? '-translate-y-10 text-sm left-2'
                                        : ''
                                }`}
                            >
                                First Name
                            </label>
                            {errors.firstName && (
                                <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>
                        {/* Last Name Input */}
                        <div className="relative">
                            <input
                                type="text"
                                id="lastName"
                                className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none ${
                                    errors.lastName
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:border-blue-500'
                                }`}
                                {...register('lastName', {
                                    required: 'Last name is required',
                                })}
                                onBlur={() => trigger('lastName')}
                            />
                            <label
                                htmlFor="lastName"
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                    errors.lastName
                                        ? 'text-red-500'
                                        : 'text-gray-500 peer-focus:text-blue-500'
                                } bg-white px-1 z-10 ${
                                    watch('lastName')
                                        ? '-translate-y-10 text-sm left-2'
                                        : ''
                                }`}
                            >
                                Last Name
                            </label>
                            {errors.lastName && (
                                <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.lastName.message}
                                </div>
                            )}
                        </div>
                        {/* Email Input */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none ${
                                    errors.email
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:border-blue-500'
                                }`}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                                onBlur={() => trigger('email')}
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                    errors.email
                                        ? 'text-red-500'
                                        : 'text-gray-500 peer-focus:text-blue-500'
                                } bg-white px-1 z-10 ${
                                    watch('email')
                                        ? '-translate-y-10 text-sm left-2'
                                        : ''
                                }`}
                            >
                                Email
                            </label>
                            {errors.email && (
                                <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                        {/* Password Input */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none ${
                                    errors.password
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:border-blue-500'
                                }`}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be at least 6 characters',
                                    },
                                })}
                                onBlur={() => trigger('password')}
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                    errors.password
                                        ? 'text-red-500'
                                        : 'text-gray-500 peer-focus:text-blue-500'
                                } bg-white px-1 z-10 ${
                                    passwordValue
                                        ? '-translate-y-10 text-sm left-2'
                                        : ''
                                }`}
                            >
                                Password
                            </label>
                            {errors.password && (
                                <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.password.message}
                                </div>
                            )}
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash
                                        size={20}
                                        className="text-gray-500"
                                    />
                                ) : (
                                    <FaEye
                                        size={20}
                                        className="text-gray-500"
                                    />
                                )}
                            </button>
                        </div>
                        {/* Confirm Password Input */}
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none ${
                                    errors.confirmPassword
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:border-blue-500'
                                }`}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) =>
                                        value === passwordValue ||
                                        'Passwords do not match',
                                })}
                                onBlur={() => trigger('confirmPassword')}
                            />
                            <label
                                htmlFor="confirmPassword"
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                    errors.confirmPassword
                                        ? 'text-red-500'
                                        : 'text-gray-500 peer-focus:text-blue-500'
                                } bg-white px-1 z-10 ${
                                    confirmPasswordValue
                                        ? '-translate-y-10 text-sm left-2'
                                        : ''
                                }`}
                            >
                                Confirm Password
                            </label>
                            {errors.confirmPassword && (
                                <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash
                                        size={20}
                                        className="text-gray-500"
                                    />
                                ) : (
                                    <FaEye
                                        size={20}
                                        className="text-gray-500"
                                    />
                                )}
                            </button>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-3 font-bold hover:bg-blue-600 text-lg rounded-md"
                        >
                            Register
                        </button>
                    </form>
                    <div className="mt-6 text-center text-lg">
                        Already have an account?{' '}
                        <Link
                            to="/sign-in"
                            className="font-semibold text-blue-500 underline"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
                {/* Right: Image Placeholder */}
                <div className="hidden lg:block lg:w-1/2 bg-gray-100">
                    <img
                        src="https://c0.wallpaperflare.com/preview/299/454/390/vietnam-h%E1%BB%99i-an-old-street-hoi-an.jpg"
                        alt="Register"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default Register
