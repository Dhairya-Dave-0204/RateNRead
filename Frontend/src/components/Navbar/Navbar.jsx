import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[#4a6cf7]/8 absolute top-0 left-0 z-50">
        <nav className="z-20 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl md:px-12">
          {/* Logo */}
          <Link
            to={"/"}
            className="text-2xl font-bold tracking-tight text-primary"
          >
            RatenRead
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden space-x-10 text-lg font-medium md:flex text-primary">
            <Link
              to="/books"
              className="hover:text-[#4a6cf7] transition hover:scale-105 duration-300"
            >
              Books
            </Link>
            <Link
              to="/about"
              className="hover:text-[#4a6cf7] transition hover:scale-105 duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#4a6cf7] transition hover:scale-105 duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Hamburger for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
        </nav>

        {/* Animated Mobile Nav Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute z-50 top-full left-0 w-full backdrop-blur-sm bg-[#4a6cf7]/6 text-lg px-6 pb-6 pt-4 space-y-4 text-primary font-medium shadow-md md:hidden"
            >
              <Link
                to="/books"
                className="block hover:text-[#4a6cf7] transition"
                onClick={() => setIsOpen(false)}
              >
                Books
              </Link>
              <Link
                to="/about"
                className="block hover:text-[#4a6cf7] transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block hover:text-[#4a6cf7] transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Navbar;
