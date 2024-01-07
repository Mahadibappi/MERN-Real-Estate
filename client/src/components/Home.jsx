/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HouseCard from "./HouseCard";

const Home = () => {
  const [offerList, setOfferList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [rentList, setRentList] = useState([]);
  console.log(offerList);

  useEffect(() => {
    const fetchOfferList = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/listing/getall?offer=true&limit=4"
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
          "http://localhost:5000/api/listing/getall?type=rent&limit=4"
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
          "http://localhost:5000/api/listing/getall?type=sale&limit=4"
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
        <div className="text-center text-slate-300 p-36">
          <h1 className="text-6xl font-semibold">Find Your Dream Home Here</h1>
          <p className="text-xl m-4 text-[#a3a5f1]">
            Home land offers you best homes in this city select your best choice
          </p>
          <Link to={"/search"}>
            <button className=" bg-[#df1f0e] px-4 py-2 rounded-lg text-xl mt-4 opacity-80 shadow-lg shadow-rose-600/50 ">
              Let's start
            </button>
          </Link>
        </div>
      </div>
      {/* data cards section */}
      <div className="max-w-6xl mx-auto flex flex-col">
        <div className="p-3 my-2">
          <div className="">
            <h2 className="text-xl text-slate-800">Recent Offers</h2>
            <Link to={"/search?offer=true"}>Show more offers</Link>
          </div>
          <div className="flex gap-6">
            {offerList &&
              offerList.map((list) => <HouseCard list={list} key={list._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
