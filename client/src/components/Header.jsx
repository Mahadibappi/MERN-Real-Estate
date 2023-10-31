/* eslint-disable no-unused-vars */
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header>
      <nav className="bg-gray-500 flex justify-around items-center  mx-auto py-3">
        <Link to="/">
          <h1 className="font-bold text-2xl py-4 ml-20 flex flex-wrap">
            Modern <span className="text-slate-100">Estate</span>
          </h1>
        </Link>
        <form className="bg-transparent flex justify-end items-center relative">
          <input
            type="text"
            placeholder="Search...
            "
            className=" focus:outline-none w-full h-6 rounded-full p-4 cursor-pointer"
          />
          <AiOutlineSearch className="h-5 w-5 absolute text-gray-400 mr-5 focus-within:text-gray-700 pointer-events-none" />
        </form>

        <ul className="flex gap-4 text-gray-200 text-xl cursor-pointer">
          <Link to="/home">
            <li className="hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full object-cover w-8 h-8"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li>SignIn</li>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
