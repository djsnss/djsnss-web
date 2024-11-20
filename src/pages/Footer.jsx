import React from 'react';
import { MenuLinks,SocialLinks } from '../data/index';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import DJSLOGO from '../assets/DJSLogo.png';
import DJSNSSLOGO from '../assets/DJSNSSLogo.png';
import NSSLOGO from '../assets/NSSLogo.png';

const Footer = () => {
  const socialIcons = {
    Instagram: FaInstagram,
    Linkedin: FaLinkedinIn,
    Facebook: FaFacebookF,
    Twitter: FaTwitter,
    Github: FaGithub,
  };

  return (
    <footer className="text-gray-600 body-font font-poppins">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Logo Section */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src={DJSLOGO} alt="DJS NSS Logo" className="h-12 w-auto m-1" />
            <img src={NSSLOGO} alt="DJS NSS Logo" className="h-12 w-auto m-1" />
            <img src={DJSNSSLOGO} alt="DJS NSS Logo" className="h-12 w-auto m-1" />
          </a>
          <p className="text-xl">DJS NSS</p>
          <p className="mt-2 text-sm text-gray-500">For You, With You, Always!</p>
        </div>

        {/* Menu Links Section */}
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Quick Links</h2>
            <nav className="list-none mb-10">
              {MenuLinks.map((menu) => (
                <li key={menu.id}>
                  <a href={`/${menu.link}`} className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    {menu.name}
                  </a>
                </li>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 DJS NSS</p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {SocialLinks.map((social) => {
              const Icon = socialIcons[social.name];
              return (
                <a key={social.id} href={social.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 cursor-pointer m-1 hover:text-gray-800">
                  <Icon className="text-lg" />
                </a>
              );
            })}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
