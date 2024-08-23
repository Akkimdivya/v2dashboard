import React, { useState, useContext } from "react";
import { FaPlus, FaSync, FaEllipsisV, FaClock } from "react-icons/fa";
import { DashboardContext } from "../context/DashboardContext";
import CategoryList from "../components/CategoryList";
import "../App.css";

const DashTitle = () => {
  const { addCategory } = useContext(DashboardContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCat, setNewCat] = useState("");

  const handleModalClose = () => {
    setModalOpen(false);
    setNewCat("");
  };

  const handleAddCategory = () => {
    addCategory(newCat);
    handleModalClose();
  };

  return (
    <div className="bg-transparent py-2 px-4 mt-4 flex flex-wrap justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">CNAPP Dashboard</h1>

      <div className="flex flex-wrap items-center space-x-4">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <FaPlus />
          <span>Add Widget</span>
        </button>
        <button className="bg-white text-gray-800 border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
          <FaSync />
        </button>
        <button className="bg-white text-gray-800 border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
          <FaEllipsisV />
        </button>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0  past2days">
          <FaClock className="clock-icon" />
          <div className="vertical-line"></div>
          <form action="">
            <select name="workspace" className="custom-select">
              <option value="2days">Past 2 days</option>
              <option value="4days">Past 4 days</option>
              <option value="6days">Past 6 days</option>
              <option value="7days">Past 7 days</option>
            </select>
          </form>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              padding: "20px",
              borderTop: "10px solid blue", 
              borderRadius: "8px", 
              borderTopLeftRadius: "8px", 
              borderTopRightRadius: "8px",
              maxWidth: "90%", // Ensure the modal doesn't exceed screen width
              margin: "auto", // Center the modal
            }}
          >
            <CategoryList />
            <h2>Add New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="w-full px-3 py-2 mt-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Add Category
              </button>
              <button onClick={handleModalClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashTitle;
