import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { FaUserCircle } from 'react-icons/fa'
import { MdCardTravel } from 'react-icons/md'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as authApiClient from '../api/auth'
import * as userApiClient from '../api/user'
import { toast } from 'react-toastify'
import { BsList } from 'react-icons/bs'

const Header = () => {
    const { isLoggedIn } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const queryClient = useQueryClient()
    const mutation = useMutation(authApiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('checkToken')
            toast.success('Signed out!')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })
    const handleLogOut = () => {
        mutation.mutate()
    }

    const { data: currentUser } = useQuery('fetchCurrentUser', userApiClient.fetchCurrentUser)

    return (
        <div className="py-4">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-black font-bold tracking-tight">
                    <Link to="/">Logo</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-3 cursor-pointer border border-gray-300 py-[8px] px-[12px] bg-white text-gray-900 rounded-full hover:shadow-md"
                            >
                                <BsList className="w-4 h-4" />
                                <div className="w-8 h-8 overflow-hidden rounded-full">
                                    <img
                                        src={`https://avatar.iran.liara.run/username?username=${currentUser?.firstName}+${currentUser?.lastName}`}
                                        alt=""
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-60 px-5 py-3 bg-white rounded-lg shadow border dark:border-transparent dark:bg-gray-800">
                                    <ul className="space-y-2 dark:text-white">
                                        <li className="font-medium">{currentUser?.email}</li>
                                        <li className="font-medium">
                                            <Link
                                                to="/my-bookings"
                                                className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                                            >
                                                <div className="mr-3">
                                                    <MdCardTravel className="w-6 h-6" />
                                                </div>
                                                My bookings
                                            </Link>
                                        </li>

                                        <hr className="dark:border-gray-700" />
                                        <li onClick={handleLogOut} className="font-medium">
                                            <a
                                                href="log-out"
                                                className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                                            >
                                                <div className="mr-3 text-red-600">
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-3 cursor-pointer border border-gray-300 py-[8px] px-[12px] bg-white text-gray-900 rounded-full hover:shadow-md"
                            >
                                <BsList className="w-4 h-4" />
                                <FaUserCircle className="w-8 h-8" />
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-60 px-5 py-3 bg-white rounded-lg shadow border dark:border-transparent dark:bg-gray-800">
                                    <ul className="space-y-3 dark:text-white">
                                        <li className="font-medium">
                                            <Link
                                                to="/sign-in"
                                                className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                                            >
                                                <div className="mr-3 text-green-600">
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                Sign in
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </span>
            </div>
        </div>
    )
}
export default Header
