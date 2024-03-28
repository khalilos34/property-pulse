"use client";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import LoggedInMenu from "./LoggedInMenu";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isLoggedIN, setIsLoggedIn] = useState(true);
  const pathname = usePathname();
  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpenMobileNav(!openMobileNav)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-10 w-auto"
                src="/logo-white.png"
                alt="PropertyPulse"
                width={50}
                height={10}
              />

              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                PropertyPulse
              </span>
            </Link>

            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "bg-black" : ""
                  }  text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathname === "/properties" ? "bg-black" : ""
                  }  text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Properties
                </Link>
                <SignedIn>
                  <Link
                    href="/properties/add"
                    className={`${
                      pathname === "/properties/add" ? "bg-black" : ""
                    }  text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Add Property
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
          <SignedIn>
            <LoggedInMenu />
          </SignedIn>
          <SignedOut>
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <Link href="/sign-in">
                  <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                    <span>Login or Register</span>
                  </button>
                </Link>
              </div>
            </div>
          </SignedOut>
        </div>
      </div>

      {openMobileNav && <MobileMenu />}
    </nav>
  );
};
export default Navbar;
