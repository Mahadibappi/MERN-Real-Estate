/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HouseCard from "./HouseCard";

const Home = () => {
  const [offerList, setOfferList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [rentList, setRentList] = useState([]);

  useEffect(() => {
    const fetchOfferList = async () => {
      try {
        const res = await fetch(
          "https://realestate-ibux.onrender.com/api/listing/getall?offer=true&limit=4"
        );
        const data = await res.json();
        setOfferList(data);
        fetchRentList();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentList = async () => {
      try {
        const res = await fetch(
          "https://realestate-ibux.onrender.com/api/listing/getall?type=rent&limit=4"
        );
        const data = await res.json();
        setRentList(data);
        fetchSalesList();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSalesList = async () => {
      try {
        const res = await fetch(
          "https://realestate-ibux.onrender.com/api/listing/getall?type=sale&limit=4"
        );
        const data = await res.json();
        setSalesList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferList();
  }, []);
  return (
    <div>
      <div className="h-[550px] w-full relative bg-gradient-to-r from-[#383a39] to-[#383a39] ">
        <img
          className="object-cover w-full h-full absolute mix-blend-overlay rounded-md opacity-65 "
          src="https://img.freepik.com/premium-photo/street-view-modern-architecture-along-haihe-river-tianjin_1417-10131.jpg?w=900"
          alt="image"
        />
        <div className="text-center text-slate-300 p-36 ">
          <h1 className="md:text-6xl sm:text-4xl font-semibold ">
            Find Your Dream Home Here
          </h1>
          <p className="md:text-xl sm:text-sm m-4 text-[#a3a5f1] ">
            Home land offers you best homes in this city select your best choice
          </p>
          <Link to={"/search"}>
            <button className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block mt-10">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white uppercase">
                Let's Start
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* data cards section */}
      <div className="max-w-6xl mx-auto flex flex-col md:p-full sm:p-10 ">
        <div className="p-3 my-2">
          <div className="">
            <h2 className="text-xl text-slate-800">Recent Offers</h2>
            <Link to={"/search?offer=true"}>Show more offers</Link>
          </div>
          <div className="flex gap-6 flex-wrap">
            {offerList &&
              offerList.map((list) => <HouseCard list={list} key={list._id} />)}
          </div>
        </div>
        <div className="p-3 my-2">
          <div className="">
            <h2 className="text-xl text-slate-800">House For Rent</h2>
            <Link to={"/search?offer=true"}>Show more offers</Link>
          </div>
          <div className="flex gap-6 flex-wrap">
            {rentList &&
              rentList.map((list) => <HouseCard list={list} key={list._id} />)}
          </div>
        </div>
        <div className="p-3 my-2">
          <div className="">
            <h2 className="text-xl text-slate-800">House For Sales</h2>
            <Link to={"/search?offer=true"}>Show more offers</Link>
          </div>
          <div className="flex gap-6 flex-wrap">
            {salesList &&
              salesList.map((list) => <HouseCard list={list} key={list._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
