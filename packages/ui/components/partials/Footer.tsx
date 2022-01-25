import React from "react";
import {
  FaGlobeEurope,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaAt,
  FaUserAlt,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="block w-full p-6 bg-gray-800">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 place-content-center">
          <div className="lg:col-span-2 block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">Wiaah Alert En</p>
            <p className="text-sm text-gray-400">
              Register now to get updates on promotions and coupons
            </p>
            <div className="flex w-4/5 lg:w-3/4 px-2 py-1.5 rounded-lg items-center space-x-2 bg-gray-700">
              <FaAt className="text-gray-400 pointer-events-none w-4 h-4" />
              <input
                placeholder="Email"
                className="flex w-full px-2 py-1.5 text-white bg-gray-700 appearance-none focus:outline-none"
              />
            </div>
            <div className="flex w-4/5 lg:w-3/4 px-2 py-1.5 rounded-lg items-center space-x-2 bg-gray-700">
              <FaUserAlt className="text-gray-400 pointer-events-none w-4 h-4" />
              <input
                placeholder="Name"
                className="flex w-full px-2 py-1.5 text-white bg-gray-700 appearance-none focus:outline-none"
              />
            </div>
            <button className="px-3.5 py-2 rounded-lg bg-green-400 text-white uppercase">
              Subscribe
            </button>
          </div>
          <div className="block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">
              Customer Service
            </p>
            <ul className="block space-y-4 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Help and FAQs</li>
            </ul>
          </div>
          <div className="block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">Information</p>
            <ul className="block space-y-4 text-sm text-gray-400">
              <li>About Wiaah</li>
              <li>Privacy Policy</li>
              <li>Terms &amp; Conditions</li>
            </ul>
          </div>
          <div className="block w-full space-y-4">
            <p className="font-bold uppercase text-green-300">Stay Connected</p>
            <ul className="block space-y-4 text-sm text-gray-400">
              <li className="flex items-center">
                <FaTwitter className="w-4 h-4 mr-2 text-sky-400" /> Twitter
              </li>
              <li className="flex items-center">
                <FaFacebook className="w-4 h-4 mr-2 text-blue-500" />
                Facebook
              </li>
              <li className="flex items-center">
                <FaInstagram className="w-4 h-4 mr-2 text-rose-500" />
                Instagram
              </li>
              <li className="flex items-center">
                <FaYoutube className="w-4 h-4 mr-2 text-red-700" />
                Youtube
              </li>
              <li className="flex items-center">
                <FaTiktok className="w-4 h-4 mr-2 text-stone-100" />
                Tiktok
              </li>
              <li className="flex items-center">
                <FaSnapchat className="w-4 h-4 mr-2 text-amber-300" />
                Snapchat
              </li>
            </ul>
          </div>
        </div>
        <div className="flex mt-8 w-full justify-end">
          <div className="flex border border-gray-400">
            <div className="flex p-4 items-center text-green-300 border-r border-gray-400">
              <FaGlobeEurope className="w-4 h-4 mr-2" />
              Switzerland
            </div>
            <div className="flex p-4 text-green-300 border-r border-gray-400">
              English
            </div>
            <div className="flex p-4 text-green-300">(USD)</div>
          </div>
        </div>
      </footer>
    </>
  );
};
