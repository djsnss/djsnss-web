import React, { useState, useEffect, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi"; // Keep core icons like this for immediate use
import { IoIosArrowDown } from "react-icons/io";
import { LuPanelRightClose } from "react-icons/lu";

// Manual Icon Mapping
const iconMap = {
  FiHome: FiHome,
  SiRotaryinternational: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiRotaryinternational }))),
  GrGallery: React.lazy(() => import("react-icons/gr").then(module => ({ default: module.GrGallery }))),
  FaQuestion: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaQuestion }))),
  MdEventNote: React.lazy(() => import("react-icons/md").then(module => ({ default: module.MdEventNote }))),
  IoIosPeople: React.lazy(() => import("react-icons/io").then(module => ({ default: module.IoIosPeople }))),
  IoPeople: React.lazy(() => import("react-icons/io5").then(module => ({ default: module.IoPeople }))),
  GiCampfire: React.lazy(() => import("react-icons/gi").then(module => ({ default: module.GiCampfire }))),
  FaRegCalendarAlt: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaRegCalendarAlt }))),
  FaTimes: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaClock }))),
  FaRegFileAlt: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaRegFileAlt }))),
  LuPanelRightClose: React.lazy(() => import("react-icons/lu").then(module => ({ default: module.LuPanelRightClose }))),
  LiaCertificateSolid: React.lazy(() => import("react-icons/lia").then(module => ({ default: module.LiaCertificateSolid }))),
};


const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [dropdowns, setDropdowns] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false); // Mobile view
      } else {
        setOpen(true); // Other views
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveRoute(location.pathname);
    if (location.hash) {
      setActiveRoute(location.hash);
    } else {
      setActiveRoute(location.pathname);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // 'sm' screen breakpoint
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the dropdown for the specific key
    }));
  };

  const navigationLinks = [
    { Icon: "FiHome", title: "Home", path: "/" },
    { Icon: "SiRotaryinternational", title: "About NSS", path: "/aboutus" },
    { Icon: "GrGallery", title: "Gallery", path: "/gallery" },
    { Icon: "FaQuestion", title: "FAQ", path: "/faq" },
    {
      Icon: "MdEventNote",
      title: "Events",
      subLinks: [
        { title: "Events", path: "/events" },
        { title: "Timeline", path: "/timeline" },
        { title: "Technical Project", path: "/technical-project" },
        { title: "Camp", path: "/nss-camp" },
        { title: "Grain-A-Thon", path: "/grain-a-thon" },
        { title: "Blood Donation Drive", path: "/blood-donation-drive" },
      ],
    },
    { Icon: "IoIosPeople", title: "Team", path: "/team" },
    {
      Icon: "IoPeople",
      title: "Volunteer",
      subLinks: [
        ...(localStorage.getItem("authToken") ? [{ title: "Check Hours", path: "/volunteer/checkhours" }] : []),
        { title: "Volunteer", path: "/volunteer/" },
        { title: "Volunteer Registration", path: "/volunteer/volunteer-registration" },
        { title: "Volunteer Login", path: "/volunteer/volunteer-login" },
        { title: "Volunteer Policy", path: "/volunteer/volunteer-policy" },
      ],
    },
    { Icon: "FaRegCalendarAlt", title: "Calendar", path: "/calendar" },
    { Icon: "FaRegFileAlt", title: "Reports", path: "/reports" },
    { Icon: "LiaCertificateSolid" , title: "Certificates", path: "https://djsnss-certificate.streamlit.app/" },
  ];

  const handleNavigation = (path) => {
    setActiveRoute(path);
    if (path.startsWith("/")) {
      const element = document.getElementById(path.substring(2));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`absolute sm:relative p-2 sm:h-screen shadow-lg border-r border-b border-white/20 sm:border-hidden backdrop-blur-lg transition-all duration-500 ease-in-out ${open ? "h-[100vh] w-[100vw] sm:w-48" : "h-max w-12 md:w-14"} z-50 font-poppins rounded-br-lg sm:rounded-none overflow-y-auto overflow-x-hidden`}
      style={{
        backgroundColor: isSmallScreen ? "rgba(0,0,0,0.5)" : "",
        backgroundImage: !isSmallScreen
          ? "linear-gradient(150deg, rgba(3,4,94,1) 0%, rgba(0,119,182,1) 25%, rgba(0,180,216,1) 50%, rgba(0,119,182,1) 75%, rgba(3,4,94,1) 100%)"
          : "none",
        backgroundSize: isSmallScreen ? "auto" : open ? "150% 150%" : "200% 200%",
        backgroundPosition: isSmallScreen ? "initial" : open ? "center" : "left",
        transition: "width 0.5s ease-in-out",
      }}
    >
      <button
        onClick={() => {
          setOpen(!open);
          setDropdowns({}); // Close all dropdowns when sidebar toggles
        }}
        className={`flex w-full h-8 items-center justify-center mb-2 rounded-lg ${open ? "bg-indigo-100": "bg-slate-100" } transition-colors duration-200`}
      >
        <LuPanelRightClose
          className={`flex aspect-square text-black text-lg sm:p-0 transition-transform ${open && "hidden"}`}
        />
        <p className={`text-black text-lg sm:text-lg font-semibold text-center ${open ? "my-2 flex" : "hidden"}`}>
          Close
        </p>
      </button>

      <div className={`w-full flex flex-col space-y-2 ${open ? "block" : "hidden sm:block"}`}>
        {navigationLinks.map(({ Icon, title, path, subLinks }) => {
          const LazyIconComponent = iconMap[Icon]; // Retrieve the lazy-loaded icon from the map

          return (
            <div key={path} className="w-full relative">
              <div className="w-full flex items-center justify-between">
                <Link
                  to={path}
                  onClick={() => {
                    if (!subLinks) {
                      handleNavigation(path);
                      setDropdowns({});
                    }
                  }}
                  className={`w-full flex items-center no-underline p-2 rounded-lg transition-all duration-300 ${
                    activeRoute === path
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-white hover:text-black hover:bg-gray-100/40"
                  }`}
                >
                  <Suspense fallback={<div className="hidden"></div>}>
                    <LazyIconComponent className={`text-lg sm:text-xl ${open ? "" : "mx-auto"} transition-transform`} />
                  </Suspense>

                  {open && (
                    <span className="ml-3 text-sm sm:text-base font-medium whitespace-nowrap">
                      {title}
                    </span>
                  )}
                  {subLinks && (
                    <button
                      onClick={() => { toggleDropdown(title); setOpen(true); }} // Toggle dropdown for the specific menu
                      className={`${open ? "block" : "hidden"} ml-1 p-1 focus:outline-none transition-all duration-300 ease-in-out`}
                    >
                      <span>
                        <IoIosArrowDown
                          className={`transition-transform ${activeRoute === path ? "text-indigo-600" : "text-white"} ${dropdowns[title] && "rotate-180"}`}
                        />
                      </span>
                    </button>
                  )}
                </Link>
              </div>

              {/* Dropdown Menu */}
              {subLinks && dropdowns[title] && (
                <div className="m-1 bg-white/20 shadow-lg rounded-lg z-10">
                  {subLinks.map((subLink) => (
                    <Link
                      key={subLink.path}
                      to={subLink.path}
                      onClick={() => {
                        handleNavigation(subLink.path);
                        setOpen(true);
                        setDropdowns((prev) => ({
                          ...prev,
                          [title]: false, // Close dropdown after navigation
                        }));
                      }}
                      className="block p-2 text-sm sm:text-base font-medium text-white no-underline rounded-lg hover:bg-white/20"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
