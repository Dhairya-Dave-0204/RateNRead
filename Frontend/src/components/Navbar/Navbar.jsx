import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 z-50 w-full bg-main-border/8">
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
              className="transition duration-300 hover:text-main-border hover:scale-105"
            >
              Books
            </Link>
            <Link
              to="/about"
              className="transition duration-300 hover:text-main-border hover:scale-105"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="transition duration-300 hover:text-main-border hover:scale-105"
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
              className="absolute left-0 z-50 w-full px-6 pt-4 pb-6 space-y-4 text-lg font-medium shadow-md top-full backdrop-blur-sm bg-main-border/6 text-primary md:hidden"
            >
              <Link
                to="/books"
                className="block transition hover:text-main-border"
                onClick={() => setIsOpen(false)}
              >
                Books
              </Link>
              <Link
                to="/about"
                className="block transition hover:text-main-border"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block transition hover:text-main-border"
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
