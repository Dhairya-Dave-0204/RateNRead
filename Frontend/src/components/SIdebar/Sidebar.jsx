import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Profile",
      to: "/profile",
      icon: (
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          stroke="#5c5c7b"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14c4 0 8 2 8 4v2H4v-2c0-2 4-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      ),
    },
    {
      name: "Library",
      to: "/library",
      icon: (
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          stroke="#5c5c7b"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6 4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v16l7-3 7 3z"
          />
        </svg>
      ),
    },
    {
      name: "Logout",
      to: "/logout",
      icon: (
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          stroke="#f87171"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-2 rounded-lg md:hidden top-5 left-3"
      >
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#fdfbff] via-[#f4f5fa] to-[#eceffd] shadow-xl`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-main-border to-ternary-pink">RatenRead</h1>
        </div>
        <nav className="p-6 space-y-8">
          {menuItems.map(({ name, to, icon }) => (
            <NavLink
              key={name}
              to={to}
              onClick={() => setIsOpen(false)}
              className="flex items-center text-lg font-medium text-gray-800 hover:text-[#4a6cf7] duration-500 transition-all"
            >
              {icon}
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
