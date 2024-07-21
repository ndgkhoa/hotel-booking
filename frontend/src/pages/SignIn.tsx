import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api/auth'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    FaArrowLeft,
    FaExclamationCircle,
    FaEye,
    FaEyeSlash,
} from 'react-icons/fa'

export type SignInFormData = {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const location = useLocation()

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        trigger,
    } = useForm<SignInFormData>()

    const [showPassword, setShowPassword] = useState(false)

    const emailValue = watch('email')
    const passwordValue = watch('password')

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            toast.success('Sign in successful!')
            await queryClient.invalidateQueries('checkToken')
            navigate(location.state?.from?.pathname || '/')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <div className="flex h-screen">
            {/* Left: Login Form */}
            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-36 md:p-52 sm:p-20 flex flex-col justify-center relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 p-2 text-blue-500 hover:text-blue-700"
                >
                    <FaArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
                <h2 className="text-lg mb-4 text-gray-400">
                    Please login to continue to your account
                </h2>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    {/* Email Input */}
                    <div className="relative mt-3">
                        <input
                            type="email"
                            id="email"
                            className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none bg-white ${
                                errors.email
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:border-blue-500'
                            }`}
                            {...register('email', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            onBlur={() => trigger('email')}
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:transform -translate-y-1/2 peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                errors.email
                                    ? 'text-red-500'
                                    : 'text-gray-500 peer-focus:text-blue-500'
                            } bg-white px-1 z-10 ${emailValue ? '-translate-y-10 text-sm left-2' : ''}`}
                        >
                            Email
                        </label>
                        {/* Error Message */}
                        {errors.email && (
                            <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                <FaExclamationCircle className="mr-1" />
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="relative my-6">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={`w-full border rounded-xl py-4 px-3 peer placeholder-transparent focus:outline-none ${
                                errors.password
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:border-blue-500'
                            }`}
                            {...register('password', {
                                required: 'This field is required',
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
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 font-medium transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:transform -translate-y-1/2 peer-placeholder-shown:left-3 peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:left-2 ${
                                errors.password
                                    ? 'text-red-500'
                                    : 'text-gray-500 peer-focus:text-blue-500'
                            } bg-white px-1 z-10 ${passwordValue ? '-translate-y-10 text-sm left-2' : ''}`}
                        >
                            Password
                        </label>
                        {/* Error Message */}
                        {errors.password && (
                            <div className="absolute left-3 bottom-[-1.5rem] flex items-center text-red-500 text-sm">
                                <FaExclamationCircle className="mr-1" />
                                {errors.password.message}
                            </div>
                        )}
                        {/* Toggle Password Visibility */}
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
                                <FaEye size={20} className="text-black" />
                            )}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 font-bold hover:bg-blue-600 text-lg rounded-md"
                    >
                        Sign In
                    </button>
                </form>
                {/* Sign up Link */}
                <div className="mt-6 text-center text-lg">
                    Need an account?{' '}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-500 underline"
                    >
                        Create one
                    </Link>
                </div>
            </div>

            {/* Right: Image */}
            <div className="w-1/2 h-full hidden lg:block box-border">
                <img
                    src="https://images.pexels.com/photos/58597/pexels-photo-58597.jpeg?cs=srgb&dl=pexels-foodoncam-58597.jpg&fm=jpg"
                    alt="Placeholder Image"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}

export default SignIn
