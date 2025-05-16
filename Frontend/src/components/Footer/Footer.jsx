import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/" },
        { name: "How It Works", href: "/" },
        { name: "Pricing", href: "/" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Book API", href: "/" },
        { name: "Reading Tips", href: "/" },
        { name: "Blog", href: "/" },
        { name: "Community", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/" },
        { name: "Terms of Service", href: "/" },
      ],
    },
  ];

  // Social media icons
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/ig_dhairya_962",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/Dhairya-Dave-0204",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/davedhairya",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
  ];
  
  return (
    <>
      <footer className="bg-primary text-text-pri">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-secondary to-tertiary">
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="mb-8 lg:w-1/2 lg:mb-0">
                <h3 className="mb-2 text-2xl font-bold">
                  Join Our Reading Community
                </h3>
                <p className="mb-0 text-text-mute">
                  Get reading recommendations, tips, and updates on new
                  features.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-accent-blue/10 text-text-pri border border-[#4a4a4c] focus:outline-none focus:ring-2 focus:ring-main-border"
                  />
                  <button className="px-6 py-3 cursor-pointer bg-main-border hover:bg-[#3a5ce7] text-white font-medium rounded-lg transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center mb-6">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-ternary-pink"
                //   className="text-main-border"
                >
                  <path
                    d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-2 text-xl font-bold">RatenRead</span>
              </div>
              <p className="max-w-xs mb-6 text-text-mute">
                Your personal digital library that evolves with your reading
                journey. Track, rate, and reflect on every book you experience.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    to={social.href}
                    key={social.name}
                    className="transition-colors duration-300 text-text-mute hover:text-main-border"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            {footerLinks.map((group) => (
              <div key={group.title} className="col-span-1">
                <h4 className="mb-4 text-lg font-semibold">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="transition-colors duration-300 text-text-mute hover:text-main-border"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Border */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#4a4a4c] to-transparent my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-text-mute">
              &copy; {currentYear} BookTracker. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 sm:mt-0">
              <Link
                to={"/"}
                className="text-sm transition-colors duration-300 text-text-mute hover:text-main-border"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/"}
                className="text-sm transition-colors duration-300 text-text-mute hover:text-main-border"
              >
                Terms of Service
              </Link>
              <Link
                to={"/"}
                className="text-sm transition-colors duration-300 text-text-mute hover:text-main-border"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
