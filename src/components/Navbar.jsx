import React, { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuPanelRightClose } from "react-icons/lu";

const iconMap = {
  FiHome: FiHome,
  SiRotaryinternational: React.lazy(() =>
    import("react-icons/si").then((module) => ({ default: module.SiRotaryinternational }))
  ),
  GrGallery: React.lazy(() =>
    import("react-icons/gr").then((module) => ({ default: module.GrGallery }))
  ),
  FaQuestion: React.lazy(() =>
    import("react-icons/fa").then((module) => ({ default: module.FaQuestion }))
  ),
  MdEventNote: React.lazy(() =>
    import("react-icons/md").then((module) => ({ default: module.MdEventNote }))
  ),
  IoIosPeople: React.lazy(() =>
    import("react-icons/io").then((module) => ({ default: module.IoIosPeople }))
  ),
  IoPeople: React.lazy(() =>
    import("react-icons/io5").then((module) => ({ default: module.IoPeople }))
  ),
  FaRegCalendarAlt: React.lazy(() =>
    import("react-icons/fa").then((module) => ({ default: module.FaRegCalendarAlt }))
  ),
  FaRegFileAlt: React.lazy(() =>
    import("react-icons/fa").then((module) => ({ default: module.FaRegFileAlt }))
  ),
};

const Navbar = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [dropdowns, setDropdowns] = useState({});
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setActiveRoute(location.pathname);
    setNavOpen(false);
    setDropdowns({});
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdowns({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback((key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const closeMenu = () => {
    setNavOpen(false);
    setDropdowns({});
  };

  const navigationLinks = [
    { Icon: "FiHome", title: "Home", path: "/" },
    { Icon: "SiRotaryinternational", title: "About", path: "/aboutus" },
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
    {
      Icon: "FaRegFileAlt",
      title: "Extras",
      subLinks: [
        { title: "Drive", path: "/drive" },
        { title: "Alumni", path: "/alumni" },
        { title: "Reports", path: "/reports" },
        { title: "Gallery", path: "/gallery" },
        { title: "FAQ", path: "/faq" },
        { title: "Calendar", path: "/calendar" },
      ],
    }
  ];

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-max md:top-5 md:max-w-4xl bg-slate-950 md:bg-slate-950/50 text-white shadow-black/50 md:border shadow-lg backdrop-blur-md rounded-none md:rounded-full z-50"
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center space-x-6 px-6 py-1">
        {navigationLinks.map(({ Icon, title, path, subLinks }) => {
          const LazyIconComponent = iconMap[Icon];
          return (
            <div key={title} className="relative group">
              {subLinks ? (
                <button
                  onClick={() => toggleDropdown(title)}
                  className="flex items-center text-white px-3 py-2 rounded-md transition hover:bg-white/10"
                >
                  <Suspense fallback={<div className="hidden"></div>}>
                    <LazyIconComponent className="text-xl mr-2" />
                  </Suspense>
                  <span>{title}</span>
                  <IoIosArrowDown className="ml-1" />
                </button>
              ) : (
                <Link
                  to={path}
                  onClick={closeMenu}
                  className={`flex items-center text-white px-3 py-1 rounded-md no-underline transition ${activeRoute === path ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                >
                  <Suspense fallback={<div className="hidden"></div>}>
                    <LazyIconComponent className="text-xl mr-2" />
                  </Suspense>
                  <span>{title}</span>
                </Link>
              )}

              {/* Desktop Dropdown */}
              {subLinks && dropdowns[title] && (
                <div className="absolute left-0 mt-2 bg-white backdrop-blur-lg shadow-lg rounded-lg w-52 py-2">
                  {subLinks.map((subLink) => (
                    <Link
                      key={subLink.path}
                      to={subLink.path}
                      onClick={closeMenu}
                      className="block px-4 py-2 no-underline text-gray-700 hover:bg-gray-100"
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

      {/* Mobile Navbar */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navOpen ? "h-screen bg-black backdrop-blur-md" : "h-12 bg-black/90 backdrop-blur-lg"
          } flex flex-col items-center`}
      >
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center justify-between px-3 py-2 w-full">
          {/* Logo */}
          <a
            href="/"
            className={`text-white font-semibold text-xl tracking-wide transition-opacity no-underline duration-300 ${navOpen ? "opacity-0" : "opacity-100"
              }`}
          >
            DJS NSS
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavOpen((prev) => !prev)}
            className={`text-white text-3xl transition-transform duration-300 ${navOpen ? "rotate-180" : "rotate-0"
              }`}
          >
            {navOpen ? <LuPanelRightClose /> : <IoIosArrowDown />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`w-full flex flex-col items-center overflow-hidden transition-all duration-500 ${navOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {navigationLinks.map(({ Icon, title, path, subLinks }) => {
            const LazyIconComponent = iconMap[Icon];
            return (
              <div key={title} className="w-full">
                {subLinks ? (
                  // Dropdown Button
                  <button
                    onClick={() => toggleDropdown(title)}
                    className="flex items-center text-white px-6 py-4 w-full text-left transition-all hover:bg-slate-950/90"
                  >
                    <Suspense fallback={<div className="hidden"></div>}>
                      <LazyIconComponent className="text-xl mr-3" />
                    </Suspense>
                    {title}
                    <IoIosArrowDown
                      className={`ml-auto transition-transform duration-300 ${dropdowns[title] ? "rotate-180" : "rotate-0"
                        }`}
                    />
                  </button>
                ) : (
                  // Normal Link
                  <Link
                    to={path}
                    onClick={closeMenu}
                    className="flex items-center text-white px-6 py-4 w-full transition-all no-underline hover:bg-gray-800"
                  >
                    <Suspense fallback={<div className="hidden"></div>}>
                      <LazyIconComponent className="text-xl mr-3" />
                    </Suspense>
                    {title}
                  </Link>
                )}

                {/* Mobile Dropdown - Now Fully Visible */}
                {subLinks && (
                  <div
                    className={`bg-slate-950 transition-all duration-500 overflow-hidden ${dropdowns[title] ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"
                      }`}
                  >
                    {subLinks.map((subLink) => (
                      <Link
                        key={subLink.path}
                        to={subLink.path}
                        onClick={closeMenu}
                        className="block px-8 py-2 no-underline text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300"
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
      </div>

    </nav>
  );
};

export default Navbar;
