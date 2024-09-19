"use client";

import './globals.css';
import { useState } from 'react';
import Image from 'next/image';

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-lg font-bold">
                <Image src="/myStore.png" alt="myStore logo" width={60} height={60}/>
              </div>
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300">Home</a>
                <a href="#" className="hover:text-gray-300">Products</a>
                <a href="#" className="hover:text-gray-300">About</a>
                <a href="#" className="hover:text-gray-300">Contact</a>
              </div>

              {/* Hamburger Menu Icon (Visible on Mobile) */}
              <button
                className="block md:hidden focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Mobile Menu (Visible when the hamburger icon is clicked) */}
            {isMenuOpen && (
              <div className="md:hidden space-y-4 mt-4">
                <a href="#" className="block hover:text-gray-300">Home</a>
                <a href="#" className="block hover:text-gray-300">Products</a>
                <a href="#" className="block hover:text-gray-300">About</a>
                <a href="#" className="block hover:text-gray-300">Contact</a>
              </div>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
