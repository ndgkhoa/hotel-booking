import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { MdCardTravel } from 'react-icons/md'
import { useEffect, useState } from 'react'
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

    const { data: currentUser } = useQuery(
        'fetchCurrentUser',
        userApiClient.fetchCurrentUser,
    )

    const [headerStyle, setHeaderStyle] = useState({
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overlayOpacity: 0.4,
        textColor: 'text-white',
        signInButtonColor: 'bg-white text-[#0094FE]',
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0
            setHeaderStyle((prevState) => ({
                ...prevState,
                backgroundColor: scrolled ? '#FFFFFF' : 'transparent',
                boxShadow: scrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                overlayOpacity: scrolled ? 0 : 0.4,
                textColor: scrolled ? 'text-black' : 'text-white',
                signInButtonColor: scrolled
                    ? 'bg-[#0094FE] text-white'
                    : 'bg-white text-[#0094FE]',
            }))
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={`sticky top-0 z-50 transition-all duration-300`}
            style={{
                backgroundColor: headerStyle.backgroundColor,
                boxShadow: headerStyle.boxShadow,
            }}
        >
            <div
                className="absolute inset-0 bg-black"
                style={{
                    opacity: headerStyle.overlayOpacity,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1,
                }}
            />
            <div className="py-4">
                <div className="md:mx-36 flex justify-between items-center">
                    <span
                        className={`text-3xl font-bold tracking-tight ${headerStyle.textColor}`}
                    >
                        <Link
                            to="/"
                            className={`block ${headerStyle.textColor}`}
                        >
                            Logo
                        </Link>
                    </span>
                    <div className="flex items-center space-x-2">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-3 cursor-pointer border border-gray-300 py-2 px-4 bg-white text-gray-900 rounded-full hover:shadow-md"
                                >
                                    <BsList className="w-4 h-4" />
                                    <div className="w-8 h-8 overflow-hidden rounded-full">
                                        <img
                                            src={`https://avatar.iran.liara.run/username?username=${currentUser?.firstName}+${currentUser?.lastName}`}
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-60 px-4 py-3 bg-white rounded-lg shadow border dark:border-transparent dark:bg-gray-800">
                                        <ul className="space-y-2 dark:text-white">
                                            <li className="font-medium">
                                                {currentUser?.email}
                                            </li>
                                            <li className="font-medium">
                                                <Link
                                                    to="/my-bookings"
                                                    className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700 py-2 px-3 rounded-md"
                                                >
                                                    <MdCardTravel className="w-6 h-6 mr-2" />
                                                    My bookings
                                                </Link>
                                            </li>

                                            <hr className="dark:border-gray-700" />
                                            <li
                                                onClick={handleLogOut}
                                                className="font-medium"
                                            >
                                                <a
                                                    href="#"
                                                    className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-red-600 py-2 px-3 rounded-md"
                                                >
                                                    <svg
                                                        className="w-6 h-6 text-red-600 mr-2"
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
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <Link to="/sign-in">
                                    <button
                                        className={`text-md font-semibold py-2 px-4 rounded-3xl transition-colors duration-300 ${headerStyle.signInButtonColor}`}
                                    >
                                        SIGN IN
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
