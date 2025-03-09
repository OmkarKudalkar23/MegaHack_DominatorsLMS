import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";

const SearchBar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showChatBot, setShowChatBot] = useState(false); // Toggle chatbot

  const oneSeachHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={oneSeachHandler}
      className="max-w-xl my-20 w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded py-4 mb-32"
    >
      <img src={assets.search_icon} alt="search_icon" className="md:w-auto w-10 px-3" />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Get going with the courses"
        className="w-full h-full outline-none text-gray-500 my-5"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white md:px-10 px-7 md:py-3 py-2 mx-1"
      >
        Search
      </button>

      {/* Chatbot Button with Padding */}
    

      {/* Conditionally Render ChatBot */}
      <ChatBot/>

    </form>
  );
};

export default SearchBar;
