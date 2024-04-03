"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const pathname = usePathname();
  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "bg-black" : ""
          } text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`${
            pathname === "/properties" ? "bg-black" : ""
          } text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Properties
        </Link>
        <Link
          href="/properties/add"
          className={`${
            pathname === "/properties/add" ? "bg-black" : ""
          } text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Add Property
        </Link>
        <SignedIn>
          <Link
            href="/profile"
            className={`${
              pathname === "/profile" ? "bg-black" : ""
            } text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            View Profile
          </Link>
          <Link
            href="/properties/bookmarks"
            className={`${
              pathname === "/properties/bookmarks" ? "bg-black" : ""
            } text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Bookmarks
          </Link>
        </SignedIn>
        <SignedOut>
          <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
            <i className="fa-brands fa-google mr-2"></i>
            <span>Login or Register</span>
          </button>
        </SignedOut>
      </div>
    </div>
  );
};

export default MobileMenu;
