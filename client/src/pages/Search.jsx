/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseCard from "../components/HouseCard.jsx";
const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [house, setHouse] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  // event handler functions
  const handleChange = (e) => {
    const inputId = e.target.id;
    if (inputId === "all" || inputId === "sale" || inputId === "rent") {
      setSidebarData({ ...sidebarData, type: inputId });
    }
    if (inputId === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      inputId === "parking" ||
      inputId === "furnished" ||
      inputId === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [inputId]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (inputId === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    // data loading functions
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `http://localhost:5000/api/listing/getall?${searchQuery}`
      );
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      }
      setShowMore(false);
      setHouse(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const showMoreData = async () => {
    const numberOfHouse = house.length;
    const startIndex = numberOfHouse;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `http://localhost:5000/api/listing/getall?${searchQuery}`
    );
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setHouse([...house, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-5 ml-4 text-slate-100 border-slate-600 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className=" flex items-center gap-2">
            <label
              className="p-2 text-lg text-slate-800 font-semibold"
              htmlFor="search"
            >
              Search here
            </label>
            <input
              className=" p-1 rounded-lg text-blue-400"
              type="text"
              name="search"
              id="searchTerm"
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
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className=" border rounded-lg text-blue-400 p-1"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="  bg-green-600 p-3 rounded-lg">Search</button>
        </form>
      </div>

      {/* // display of house data functions */}
      <div className="flex-1 ml-5">
        <h1 className="p-2 m-2 text-3xl text-slate-100 text-center">
          Modern Homes
        </h1>

        <div className="flex flex-wrap gap-2 p-6 sm:justify-center lg:justify-start">
          {!loading && house.length === 0 && <p>No Result Found</p>}

          {loading && <p>Loading...</p>}

          {!loading &&
            house &&
            house?.map((list) => <HouseCard key={list._id} list={list} />)}
          {showMore && (
            <button
              onClick={showMoreData}
              className="text-green-700 text-center w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
