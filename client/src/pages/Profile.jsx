// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-center text-2xl my-10 font-semibold">Profile</h1>
      <form className=" flex flex-col gap-4">
        <img
          className=" rounded-full w-24 h-24 object-cover self-center"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          className="outline-none p-2 border rounded-full text-center font-semibold focus-within:shadow"
          type="text"
          placeholder="Name"
          id="name"
        />
        <input
          className="outline-none p-2 border rounded-full text-center font-semibold"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          className="outline-none p-2 border rounded-full text-center font-semibold"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className="mt-6 bg-green-500 w-full p-2 rounded-full text-white font-semibold">
          Update
        </button>
        <button className="mt-2 bg-gray-600 w-full p-2 rounded-full text-white font-semibold">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between my-2">
        <span className="bg-red-500 px-2 p-1 rounded-full font-semibold text-gray-300 m-1 cursor-pointer">
          Delete Account
        </span>
        <span className="bg-green-500 px-2 p-1 rounded-full font-semibold text-gray-300 m-1 cursor-pointer">
          Log Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
