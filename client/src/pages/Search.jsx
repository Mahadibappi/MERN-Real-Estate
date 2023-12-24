import React from "react";
const Search = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="my-5 p-3 text-slate-100">
        <form>
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
            />
          </div>
          <div className=" flex gap-2 my-3 p-2 ">
            <label className="font-semibold text-slate-800" htmlFor="type">
              Type:
            </label>
            <div className=" flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 " id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" id="sale" />
              <span>Sale</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" id="rent" />
              <span>Rent</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex gap-2 my-3 p-2 ">
            <label className="font-semibold text-slate-800" htmlFor="type">
              Amenities:
            </label>
            <div className=" flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 " id="parking" />
              <span>Parking</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>
        </form>
      </div>
      <div className=""> list of houses</div>
    </div>
  );
};

export default Search;
