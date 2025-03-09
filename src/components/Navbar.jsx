import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdowns, setDropdowns] = useState({});
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdowns({});
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (key) => {
        setDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const navigationLinks = [
        { Icon: FiHome, title: "Home", path: "/" },
        { title: "About NSS", path: "/aboutus" },
        {
            title: "Events",
            subLinks: [
                { title: "Events", path: "/events" },
                { title: "Timeline", path: "/timeline" },
                { title: "Calendar", path: "/calendar" },
                { title: "Technical Projects", path: "/technical-project" },
                { title: "Camp", path: "/nss-camp" },
                { title: "Grain-A-Thon", path: "/grain-a-thon" },
                { title: "Blood Donation Drive", path: "/blood-donation-drive" },
            ],
        },
        { title: "Team", path: "/team" },
        {
            title: "Volunteer",
            subLinks: [
                ...(localStorage.getItem("authToken") ? [{ title: "Check Hours", path: "/volunteer/checkhours" }] : []),
                { title: "Volunteer", path: "/volunteer/" },
                { title: "Volunteer Registration", path: "/volunteer/volunteer-registration" },
                { title: "Volunteer Login", path: "/volunteer/volunteer-login" },
                { title: "Volunteer Policy", path: "/volunteer/volunteer-policy" },
            ],
        },
        {
            title: "Extras",
            subLinks: [
                { title: "Reports", path: "/reports" },
                { title: "Certificates", path: "https://djsnss-certificate.streamlit.app/" },
                { title: "Gallery", path: "/gallery" },
                { title: "FAQ", path: "/faq" },
            ],
        }
    ];

    return (
        <div className="flex justify-center items-start">
            <nav className="fixed flex w-screen md:w-max mt-12 md:mt-20 md:max-w-4xl bg-black/90 md:bg-black/30 text-white shadow-black/50 border shadow-lg backdrop-blur-md items-start self-center rounded-none md:rounded-full z-50">
                <div className="container mx-auto flex justify-between md:justify-center items-center p-4">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold block md:hidden">DJSCE NSS</Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-6" ref={dropdownRef}>
                        {navigationLinks.map((link, index) => (
                            <div key={index} className="relative">
                                <Link
                                    to={link.path || "#"}
                                    className="px-3 hover:text-gray-300 flex items-center underline-none"
                                    onClick={() => link.subLinks && toggleDropdown(link.title)}
                                >
                                    {link.Icon && <link.Icon className="mr-2" />}
                                    {link.title}
                                    {link.subLinks && <IoIosArrowDown className="ml-1 transition-transform" />}
                                </Link>

                                {/* Dropdown */}
                                {link.subLinks && dropdowns[link.title] && (
                                    <div className="absolute left-0 mt-2 bg-black/85 backdrop-blur-md text-white rounded-lg shadow-lg w-48 p-2">
                                        {link.subLinks.map((sub, subIndex) => (
                                            <Link key={subIndex} to={sub.path} className="block px-4 py-2 hover:bg-white/30 rounded-lg backdrop-blur-xl">
                                                {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black backdrop-blur-md p-4 flex flex-col items-center text-white w-full h-screen">
                        {navigationLinks.map((link, index) => (
                            <div key={index} className="w-full">
                                <Link
                                    to={link.path || "#"}
                                    className="block px-4 py-3 text-lg"
                                    onClick={() => link.subLinks ? toggleDropdown(link.title) : setIsOpen(false)}
                                >
                                    {link.title}
                                    {link.subLinks && <IoIosArrowDown className="inline text-white ml-2" />}
                                </Link>

                                {link.subLinks && dropdowns[link.title] && (
                                    <div className="pl-4 bg-white/10 rounded-md">
                                        {link.subLinks.map((sub, subIndex) => (
                                            <Link key={subIndex} to={sub.path} className="block px-4 py-2 hover:bg-white/20" onClick={() => setIsOpen(false)}>
                                                {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;