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
import { MenuLinks, SocialLinks, ReportLinks } from "../data/index";
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
    <Footer className="bg-slate-950 text-gray-300 rounded-none flex-col">
      <div className="w-full px-6 sm:px-12 py-10 flex flex-col md:flex-row lg:justify-between lg:gap-12">
        {/* Left Section */}
        <div className="lg:w-2/3 space-y-6">
          <div>
            <FooterTitle
              className="text-2xl md:text-3xl font-extrabold text-sky-300"
              title="DJS NSS"
            />
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              For You, With You, Always!
            </p>
          </div>

          {/* Embedded Map */}
          <div className="w-full h-40 md:h-56 overflow-hidden rounded-lg shadow-lg border border-gray-700">
            <iframe
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=655&amp;height=240&amp;hl=en&amp;q=DJ Sanghvi College&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>

          <div className="text-sm md:text-base text-white">
            <p>📍 Address: DJSCE, Sector 5, Vile Parle West, Mumbai, India</p>
            <p>📞 Contact: +91 81693 88352</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          {/* Useful Links Section */}
          <div className="flex flex-col w-full">
            <FooterTitle
              className="text-xl md:text-2xl font-extrabold text-sky-300"
              title="Useful Links"
            />
            <FooterLinkGroup col>
              <div className="flex flex-wrap gap-4">
                {MenuLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={`/${link.link}`}
                    className="text-sm md:text-lg text-white hover:text-sky-300 transition-all duration-300 ease-in-out"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </FooterLinkGroup>
          </div>

          <div className="flex flex-col w-full">
            <FooterTitle
              className="text-xl md:text-2xl font-extrabold text-sky-300"
              title="Reports and Forms"
            />
            <FooterLinkGroup col>
              <div className="flex flex-wrap gap-4">
                {ReportLinks.map((report) => (
                  <div key={report.year}>
                    <p className="text-white text-sm md:text-base font-semibold">
                      {report.year}
                    </p>
                    <div className="flex flex-col gap-2">
                      {report.reports.map((item) => (
                        <a
                          key={item.id}
                          href={item.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base text-white hover:text-sky-300 transition-all duration-300 ease-in-out"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FooterLinkGroup>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col">
            <FooterTitle
              className="text-xl md:text-2xl font-extrabold text-sky-300"
              title="Follow Us"
            />
            <div className="flex space-x-6">
              {SocialLinks.map((social) => {
                const IconComponent = getIcon(social.name);
                return IconComponent ? (
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.id}
                    className="text-white hover:text-sky-300 transition-all duration-300 text-2xl md:text-3xl hover:scale-110"
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
      <div className="w-full bg-gray-900 text-white px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700">
        <FooterCopyright
          href="/"
          by="DJS NSS™"
          year={2024}
          className="text-xs sm:text-sm md:text-base"
        />
      </div>
    </Footer>
  );
}

export default FooterComponent;
