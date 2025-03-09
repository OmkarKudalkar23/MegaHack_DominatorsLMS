import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-gray-900 to-black">
      <h1
        className="font-bold text-white max-w-3xl mx-auto relative"
        style={{
          fontSize: "40px", // home-heading-small
          lineHeight: "44px",
        }}
      >
        The one-stop destination providing services for a{" "}
        <span className="text-blue-400">successful career</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p
        className="md:block hidden text-gray-400 max-w-2xl mx-auto"
        style={{ fontSize: "20px", lineHeight: "28px" }} // default
      >
        Bringing to you world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <p
        className="md:hidden hidden text-gray-400 max-w-sm mx-auto"
        style={{ fontSize: "15px", lineHeight: "24px" }} // default
      >
        Bringing to you world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
