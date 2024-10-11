"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust this path based on your file structure
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login'); // Redirect to login page after sign-out
  };

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <header className="bg-gray-800 text-white">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-lg font-bold">
                <Image src="/myStore.png" alt="myStore logo" width={60} height={60} />
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 items-center">
                <Link href="/" className="hover:text-gray-300">Home</Link>
                <Link href="/products" className="hover:text-gray-300">Products</Link>
                <Link href="/404" className="hover:text-gray-300">About</Link>
                <Link href="/404" className="hover:text-gray-300">Contact</Link>

                {/* Display authentication state */}
                {user ? (
                  <>
                    <span className="text-sm">Welcome, {user.email}</span>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="hover:text-gray-300">Login</Link>
                    <Link href="/signup" className="hover:text-gray-300">Sign Up</Link>
                  </>
                )}
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
                <Link href="/" className="block hover:text-gray-300">Home</Link>
                <Link href="/products" className="block hover:text-gray-300">Products</Link>
                <Link href="/404" className="block hover:text-gray-300">About</Link>
                <Link href="/404" className="block hover:text-gray-300">Contact</Link>

                {/* Authentication state in mobile menu */}
                {user ? (
                  <>
                    <span className="block text-sm">Welcome, {user.email}</span>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block hover:text-gray-300">Login</Link>
                    <Link href="/signup" className="block hover:text-gray-300">Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
