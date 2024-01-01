/* eslint-disable no-unused-vars */
import React from "react";

const Home = () => {
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
            Home land offers you best homes in this city so select your bes
            choice
          </p>
          <button className=" bg-[#FF2513] px-4 py-2 rounded-lg text-xl mt-4 opacity-90 ">
            Let's start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
