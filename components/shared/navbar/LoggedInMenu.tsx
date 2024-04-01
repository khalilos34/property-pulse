"use client";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const LoggedInMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
      <Link
        href="/profile"
        className={`${
          pathname === "/profile" ? "bg-black" : ""
        }  text-white hover:bg-gray-900 hover:text-white rounded-md mx-2 px-3 py-2`}
      >
        Profile
      </Link>
      <Link
        href="/bookmarks"
        className={`${
          pathname === "/bookmarks" ? "bg-black" : ""
        }  text-white hover:bg-gray-900 hover:text-white rounded-md mr-2 px-3 py-2`}
      >
        Bookmarks
      </Link>
      <Link href="/" className="relative group">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </button>
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          2{/* <!-- Replace with the actual number of notifications --> */}
        </span>
      </Link>
      {/* <!-- Profile dropdown button --> */}
      <div className="text-white ml-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default LoggedInMenu;
