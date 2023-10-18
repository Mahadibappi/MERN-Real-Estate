// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-[650px] w-[400px] overflow-hidden rounded-3xl">
        <div
          className="h-full w-full bg-[100%] "
          style={{
            backgroundImage: `url(
              https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?w=900&t=st=1695564871~exp=1695565471~hmac=4fbe38826442c0a07cec3412127bd88d230f1cee0186b9038a1a1e4046ee4c85
            )`,
          }}
        ></div>

        <div className="absolute bottom-0 flex h-3/4 w-full flex-col rounded-t-3xl bg-black bg-opacity-20 shadow ">
          <h2 className="text-center text-white text-2xl mt-[-80px]">
            Register As New User
          </h2>
          <form action="#" className="mt-10 space-y-8 px-10 py-10 text-center">
            <div className="group relative">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={name}
                required
                className="peer h-12 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none "
              />

              <label
                htmlFor="name"
                className="absolute left-1/3 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
              >
                Full Name
              </label>
            </div>
            <div className="group relative">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="peer h-12 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none "
              />

              <label
                htmlFor="email"
                className="absolute left-1/3 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
              >
                Email
              </label>
            </div>
            <div className="group relative">
              <input
                // type={visible ? "text" : "password"}
                // name="password"
                // id="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
                className="peer h-12 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
              />
              <label
                htmlFor="password"
                className="absolute left-1/3 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
              >
                Password
                {/* {visible ? (
                  <AiOutlineEye
                    size={20}
                    className=" mx-20 "
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    className=" mx-20 "
                    onClick={() => setVisible(true)}
                  />
                )} */}
              </label>
            </div>

            <button
              type="submit"
              className=" h-10 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover: bg-blue-800"
            >
              Register
            </button>
          </form>
          <p className="gap-2 text-center text-white ">
            Already have an account?
            <Link
              to={"/login"}
              className="font-semibold text-sky-400 hover:text-blue-800 "
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
