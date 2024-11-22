import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
} from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { LuContact2 } from "react-icons/lu";
import { SiRotaryinternational } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import Logo from '/DJSNSSLogo.png';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
    if (location.hash) {
      setActiveRoute(location.hash);
    } else {
      setActiveRoute(location.pathname);
    }
  }, [location]);

  // Detect screen size changes dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // 'sm' screen breakpoint
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationLinks = [
    { Icon: FiHome, title: "Home", path: "/" },
    { Icon: SiRotaryinternational, title: "About NSS", path: "/about" },
    { Icon: MdEventNote, title: "Events", path: "/events" },
    { Icon: GrProjects, title: "Projects", path: "/projects" },
    { Icon: LuContact2, title: "Contact", path: "/contact" },
    { Icon: IoIosPeople, title: "Volunteer", path: "/volunteer" }
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
      className={`absolute sm:relative h-max sm:h-screen w-max sm:w-full p-2 shadow-lg border border-white/20 sm:border-none backdrop-blur-lg transition-all duration-300 ease-in-out ${open ? "w-40 sm:w-60" : "w-12 sm:w-16"
        } z-50 font-poppins rounded-br-lg sm:rounded-none`}
      style={{
        background: isSmallScreen
          ? "transparent"
          : " linear-gradient(180deg, rgba(89,165,245,1) 0%, rgba(198,255,230,1) 100%)",
        backgroundSize: open ? "150% 150%" : "200% 200%",
        backgroundPosition: open ? "center" : "left",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-10 rounded-lg bg-slate-100 transition-colors duration-200"
      >
        <div className="flex h-full items-center justify-center">
          <img src={Logo} alt="DJSNSS" className="h-full flex m-auto my-2" />
        </div>
      </button>

      <div className={`flex flex-col space-y-2 ${open ? "block" : "hidden sm:block"}`}>
        {navigationLinks.map(({ Icon, title, path }) => (
          <Link
            key={path}
            to={path}
            onClick={() => { handleNavigation(path); setOpen(false); }}
            className={`flex items-center p-2 rounded-lg transition-all duration-200 ${activeRoute === path
                ? "bg-indigo-100 text-indigo-600"
                : "text-white hover:text-indigo-600 hover:bg-gray-100"
              }`}
          >
            <Icon className="text-lg sm:text-xl" />
            {open && (
              <span className="ml-3 text-sm sm:text-base font-medium whitespace-nowrap">
                {title}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
