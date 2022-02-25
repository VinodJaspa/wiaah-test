import React from "react";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
export const AuthFooter: React.FC = () => {
  return (
    <>
      <div className="block w-full items-center justify-center space-y-4 space-x-4 bg-green-400 p-6 md:flex md:space-y-0">
        <p className="text-center text-xl">Turn Your Passion Into a Business</p>
        <div>
          <Link href="/seller-signup">
            <button className="mx-auto flex w-44 items-center border bg-white px-3 py-2 text-sm uppercase text-gray-700">
              <FaUserAlt className="mr-2 h-4 w-4" />
              Open a shop
            </button>
          </Link>
        </div>
        <div>
          <Link href="/login">
            <button className="mx-auto flex w-44 items-center border bg-black px-3 py-2 text-sm uppercase text-green-400">
              <FaUserAlt className="mr-2 h-4 w-4" />
              Seller login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
