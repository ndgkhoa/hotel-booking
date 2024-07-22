import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa'
import { AiOutlineGithub } from 'react-icons/ai'
import { IoMdMail } from 'react-icons/io'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-footer-image w-full text-gray-700 body-font relative">
            <div className="footer-overlay"></div>
            <div className="flex flex-col md:flex-row px-5 py-6 md:px-0 md:py-6 md:mx-36 relative z-10">
                {/* Logo and Social Links */}
                <div className="flex-shrink-0 w-full md:w-1/4 text-center md:text-left mb-10 md:mb-0 text-white">
                    <Link
                        to="/"
                        className={`flex items-center text-2xl font-bold`}
                    >
                        <img
                            src="/public/logo1.png"
                            alt="Logo"
                            width={90}
                            height={90}
                        />
                        Booking
                    </Link>
                    <p className="mt-2 text-sm text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit laoreet metus, condimentum vehicula enim
                        sollicitudin sit amet.
                    </p>
                    <div className="mt-4">
                        <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                            <a
                                className="text-white cursor-pointer hover:text-gray-300"
                                href="#"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a
                                className="ml-3 text-white cursor-pointer hover:text-gray-300"
                                href="#"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                className="ml-3 text-white cursor-pointer hover:text-gray-300"
                                href="#"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                className="ml-3 text-white cursor-pointer hover:text-gray-300"
                                href="#"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            <a
                                className="ml-3 text-white cursor-pointer hover:text-gray-300"
                                href="#"
                                aria-label="GitHub"
                            >
                                <AiOutlineGithub className="w-5 h-5" />
                            </a>
                        </span>
                    </div>
                </div>

                {/* Footer Sections */}
                <div className="w-full md:w-3/4 hidden md:flex flex-col md:flex-row md:ml-10 text-white">
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                            About
                        </h2>
                        <nav className="mb-10 list-none">
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Company
                                </a>
                            </li>
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Careers
                                </a>
                            </li>
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Blog
                                </a>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                            Support
                        </h2>
                        <nav className="mb-10 list-none">
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Contact Support
                                </a>
                            </li>
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Help Resources
                                </a>
                            </li>
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Release Updates
                                </a>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                            Platform
                        </h2>
                        <nav className="mb-10 list-none">
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Terms &amp; Privacy
                                </a>
                            </li>
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    Pricing
                                </a>
                            </li>
                            <li className="mt-3">
                                <a className="text-gray-100 cursor-pointer hover:text-gray-300">
                                    FAQ
                                </a>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                            Contact
                        </h2>
                        <nav className="mb-10 list-none">
                            <li className="mt-3">
                                <a
                                    className="text-gray-100 cursor-pointer hover:text-gray-300"
                                    href="mailto:info@example.com"
                                >
                                    <IoMdMail className="inline mr-2" />
                                    Send a Message
                                </a>
                            </li>
                            <li className="mt-3">
                                <a
                                    className="text-gray-100 cursor-pointer hover:text-gray-300"
                                    href="tel:+1234567890"
                                >
                                    <BsFillTelephoneFill className="inline mr-2" />
                                    +123-456-7890
                                </a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="py-2 relative z-10 px-4">
                <div className="w-full border-t border-white mx-auto max-w-screen-lg"></div>
            </div>
            <div className="container mx-auto px-5 py-4 text-center text-white relative z-10">
                <p className="text-sm capitalize">
                    © 2024 All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer
