import { SellerLayout } from "@blocks";
import Head from "next/head";
import React from "react";

const EditProfileForm = () => {
  return (
    <>
      <Head>
        <title>Wiaah | Edit Profile</title>
      </Head>

      <SellerLayout>
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 text-center">
              Edit Profile
            </h2>

            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-10">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
              />
              <p className="mt-4 font-medium text-gray-900 text-center">
                Change profile photo
              </p>
              <button className="text-sm text-blue-500 hover:underline text-center">
                Remove or reset to default
              </button>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-lg">#</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">30 characters max</p>
              </div>

              {/* Bio */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-sm text-gray-400 mt-1">150 characters max</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default EditProfileForm;
