import React from "react";
import profile from "../images/DI.jpg";
import { FaSearch } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import '../styles/Navbar.css';

const Navbar = ({ notifications = [], searchQuery, setSearchQuery }) => {
  return (
    <div className="navbar">
      <div className="breadcrumbs">
        <span>Home</span>
        <span className="mx-2">&gt;</span>
        <span className="current-page">Dashboard V2</span>
      </div>

      <div className="search-bar-ani">
        <div className="w-full max-w-[400px] sm:w-[300px] md:w-[400px] lg:mr-[5rem] relative flex items-center">
          <FaSearch className="absolute text-gray-600 left-3" />
          <input
            type="text"
            placeholder="Search anything..."
            className="custom-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="notification-bell">
          <LuBellRing className="bell-icon" />
          {notifications.length > 0 && (
            <div className="notification-count">{notifications.length}</div>
          )}
        </div>

        <div className="profile">
          <img src={profile} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
