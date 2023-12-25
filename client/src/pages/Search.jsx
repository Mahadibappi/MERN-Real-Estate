/* eslint-disable no-unused-vars */
import React, { useState } from "react";
const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const handleChange = (e) => {};
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-3 text-slate-100 border-slate-600 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className=" flex items-center gap-2">
            <label
              className="p-2 text-lg text-slate-800 font-semibold"
              htmlFor="search"
            >
              Search here
            </label>
            <input
              className=" p-1 rounded-lg"
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className=" flex gap-2 p-2 flex-wrap items-center ">
            <label className="font-semibold text-slate-800" htmlFor="type">
              Type:
            </label>
            <div className=" flex items-center gap-2">
              <input
                checked={sidebarData.type === "all"}
                onChange={handleChange}
                type="checkbox"
                className="w-4 h-4 "
                id="all"
              />
              <span>Sale & Rent</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="sale"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="rent"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="offer"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex gap-2 p-2 ">
            <label className="font-semibold text-slate-800" htmlFor="type">
              Amenities:
            </label>
            <div className=" flex items-center gap-2">
              <input
                onChange={handleChange}
                checked={sidebarData.parking}
                type="checkbox"
                className="w-4 h-4 "
                id="parking"
              />
              <span>Parking</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                onChange={handleChange}
                checked={sidebarData.furnished}
                type="checkbox"
                className="w-4 h-4"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3">
            <label className="text-slate-800 font-semibold">Sort:</label>
            <select
              name="options"
              id="sort_order"
              className=" border rounded-lg text-blue-400 p-1"
            >
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="  bg-green-600 p-3 rounded-lg">Search</button>
        </form>
      </div>
      <div className=""> list of houses</div>
    </div>
  );
};

export default Search;
