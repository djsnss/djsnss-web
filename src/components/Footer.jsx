import React from "react";
import {
  Footer,
  FooterCopyright,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";
import { MenuLinks, SocialLinks } from "../data/index";
import { Link } from "react-router-dom";

// Helper function to return icons based on social media names
const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case "facebook":
      return <BsFacebook />;
    case "instagram":
      return <BsInstagram />;
    case "twitter":
      return <BsTwitter />;
    case "github":
      return <BsGithub />;
    case "linkedin":
      return <BsLinkedin />;
    default:
      return null;
  }
};

// Main Footer Component
function FooterComponent() {
  return (
    <Footer className="bg-light-navy no-underline text-gray-300 rounded-none">
      <div className="w-full">
        {/* Footer Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 px-6 sm:px-12 py-10">
          {/* DJSNSS Section */}
          <div className="lg:w-1/2">
            <FooterTitle
              className="text-xl sm:text-2xl md:text-3xl pb-3 font-extrabold text-sky-300"
              title="DJS NSS"
            />
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
              For You, With You, Always!
            </p>
            <div className="mt-5 text-sm sm:text-base md:text-lg text-white">
              <p>
                📍 Address: DJSCE, Sector 5, Vile Parle West, Mumbai,
                Maharashtra, India
              </p>
              <p>📞 Contact: +91 81693 88352</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col lg:w-1/2 gap-8 lg:flex-row">
            {/* Useful Links Section */}
            <div className="flex flex-col lg:w-1/2">
              <FooterTitle
                className="text-lg sm:text-xl md:text-2xl pb-3 font-extrabold text-sky-300"
                title="Useful Links"
              />
              <FooterLinkGroup col>
                <div className="flex flex-wrap gap-4">
                  {MenuLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={`/${link.link}`}
                      className="text-sm sm:text-base md:text-lg pb-3 text-white hover:text-bright-blue transition duration-300 no-underline"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </FooterLinkGroup>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col">
              <FooterTitle
                className="text-lg sm:text-xl md:text-2xl pb-3 font-extrabold text-sky-300"
                title="Follow Us"
              />
              <div className="flex space-x-6 justify-start sm:justify-center">
                {SocialLinks.map((social) => {
                  const IconComponent = getIcon(social.name);
                  return IconComponent ? (
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={social.id}
                      className="text-white hover:text-bright-blue transition duration-300 text-xl sm:text-2xl md:text-3xl"
                    >
                      {IconComponent}
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="w-full bg-darkgray text-white px-4 sm:px-10 py-4 flex items-center justify-between">
          <FooterCopyright
            href="/"
            by="DJS NSS™"
            year={2024}
            className="text-xs sm:text-sm md:text-base no-underline"
          />
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;
