/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchFromUrl = urlParams.get("searchTerm");
    if (searchFromUrl) {
      setSearch(searchFromUrl);
    }
  }, [location.search]);

  return (
    <header>
      <nav className="bg-[#0C101C]  flex justify-around items-center  mx-auto py-3">
        <Link to="/">
          <h1 className="font-semi-bold text-[#dee0e7] text-2xl py-4 ml-20 flex flex-wrap">
            Home <span className="">Land</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-[#0C101C] flex justify-end items-center relative"
        >
          <input
            type="text"
            placeholder="Search...
            "
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)}
            className=" focus:outline-none w-full h-6 rounded-full p-4 cursor-pointer"
          />
          <AiOutlineSearch className="h-5 w-5 absolute text-gray-400 mr-5 focus-within:text-gray-700 pointer-events-none" />
        </form>

        <ul className="flex gap-4 text-gray-200 text-md cursor-pointer">
          <Link to="/">
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
