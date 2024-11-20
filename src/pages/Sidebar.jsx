import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiChevronsRight,
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

  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
    // Handle hash routes
    if (location.hash) {
      setActiveRoute(location.hash);
    } else {
      setActiveRoute(location.pathname);
    }
  }, [location]);

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
      className={`fixed top-0 left-0 h-screen bg-forest-green p-4 shadow-lg transition-all duration-300 ease-in-out ${open ? "w-48" : "w-16"} z-50 font-poppins rounded-r-xl`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-10 mb-6 rounded-lg bg-slate-100 transition-colors duration-200"
      >
        <div className="flex items-center justify-center">
          <FiChevronsRight
            className={`text-xl transition-transform duration-300 ${open ?"rotate-180" : ""}`}
          />
        </div>
      </button>

    
      

      <div className="flex flex-col space-y-2">
        
        <img src={Logo} alt="DJSNSS" className={`${open ? "w-16":"w-16"} flex m-auto`}/>
        
        {navigationLinks.map(({ Icon, title, path }) => (
          <Link
            key={path}
            to={path}
            onClick={() => handleNavigation(path)}
            className={`flex items-center p-2 rounded-lg transition-all duration-200 ${activeRoute === path? "bg-indigo-100 text-jade": "text-white hover:text-indigo-600 hover:bg-slate-100"}`}
          >
            <Icon className="text-xl sm:text-base " />
            {open && (
              <span className="ml-3 text-sm sm:text-xs font-medium whitespace-nowrap">
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