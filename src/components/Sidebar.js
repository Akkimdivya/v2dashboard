import React, { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { DashboardContext } from "../context/DashboardContext";
import { MdDelete } from "react-icons/md";
import "../Sidebar.css";

function Sidebar() {
  const {
    isOpen,
    setIsOpen,
    activeCategory,
    categories,
    addWidget,
    updateWidgetStatus,
    removeWidget,
  } = useContext(DashboardContext);

  const [tempSelectedWidgets, setTempSelectedWidgets] = useState([]);
  const [initialWidgets, setInitialWidgets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: "", text: "" });

  const activeCategoryData = categories.find(
    (category) => category.category === activeCategory
  );

  useEffect(() => {
    if (activeCategoryData) {
      setInitialWidgets(
        activeCategoryData.widgets.map((widget) => ({
          name: widget.name,
          status: widget.status,
        }))
      );
      setTempSelectedWidgets(
        activeCategoryData.widgets
          .filter((widget) => widget.status === "active")
          .map((widget) => widget.name)
      );
    }
  }, [activeCategoryData]);

  const toggleSidebar = () => {
    if (isOpen) {
      setTempSelectedWidgets(
        initialWidgets
          .filter((widget) => widget.status === "active")
          .map((widget) => widget.name)
      );
    }
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const handleCheckboxChange = (widgetName) => {
    setTempSelectedWidgets((prevSelectedWidgets) =>
      prevSelectedWidgets.includes(widgetName)
        ? prevSelectedWidgets.filter((name) => name !== widgetName)
        : [...prevSelectedWidgets, widgetName]
    );
  };

  const handleConfirm = () => {
    if (activeCategoryData) {
      activeCategoryData.widgets.forEach((widget) => {
        if (!tempSelectedWidgets.includes(widget.name)) {
          updateWidgetStatus(activeCategory, widget.name, "inactive");
        }
      });

      tempSelectedWidgets.forEach((widgetName) => {
        const widgetExists = activeCategoryData.widgets.find(
          (widget) => widget.name === widgetName
        );
        if (!widgetExists) {
          addWidget(activeCategory, {
            name: widgetName,
            text: "Custom data",
            type: "custom",
            data: "Custom data",
            status: "active",
          });
        } else {
          updateWidgetStatus(activeCategory, widgetName, "active");
        }
      });
    }

    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleAddWidgetClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewWidget({ name: "", text: "" });
  };

  const handleAddWidget = () => {
    if (activeCategory) {
      addWidget(activeCategory, {
        name: newWidget.name,
        text: newWidget.text,
        type: "custom",
        data: "Custom data",
        status: "active",
      });
      handleModalClose();
    }
  };

  return (
    <div>
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`sidebar flex flex-col justify-between  ${isOpen ? "active" : ""}`}>
        <div>
          <div className="header px-4 py-2 w-full flex justify-between items-center bg-blue-900 text-white">
            <h5>Add Widget</h5>
            <button onClick={toggleSidebar}>
              <IoClose />
            </button>
          </div>
          <div className="description px-4 py-3 text-sm">
            Personalize your dashboard by adding the following widget
          </div>
          <div
            className="widget-list flex flex-col overflow-auto scrollbar-none"
            style={{ maxHeight: "70vh" }}
          >
            {activeCategoryData ? (
              <div>
                <div className="flex w-full justify-between items-center mb-5 mt-5 px-4">
                  <h1 className="text-lg font-semibold">
                    {activeCategoryData.category}
                  </h1>
                  <button
                    onClick={handleAddWidgetClick}
                    className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    + Add Widget
                  </button>
                </div>

                {activeCategoryData.widgets.map((widget) => (
                  <div
                    className="flex justify-between items-center border-t-2 border-b-2"
                    key={widget.name}
                  >
                    <div className="py-2 px-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={tempSelectedWidgets.includes(widget.name)}
                        onChange={() => handleCheckboxChange(widget.name)}
                        className="mr-3 mt-1"
                      />
                      <label className="text-sm">{widget.name}</label>
                    </div>
                    <button
                      title="Delete"
                      className="text-red-600 mr-7 opacity-55"
                      onClick={() =>
                        removeWidget(activeCategoryData.category, widget.name)
                      }
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="px-4">No active category selected</p>
            )}
          </div>
        </div>

        <div className="footer flex justify-between gap-3 py-2 px-4">
          <button
            className="p-2 text-blue-950 text-xs border-2 border-blue-950 rounded-lg w-[100px]"
            onClick={toggleSidebar}
          >
            Cancel
          </button>
          <button
            className="p-2 text-white text-xs border-2 rounded-lg w-[100px] bg-blue-950"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-lg font-semibold">Add New Widget</h2>
            <input
              type="text"
              placeholder="Widget Name"
              value={newWidget.name}
              onChange={(e) =>
                setNewWidget({ ...newWidget, name: e.target.value })
              }
              className="w-full px-3 py-2 mt-2 mb-4 border rounded-lg"
            />
            <textarea
              placeholder="Widget Text"
              value={newWidget.text}
              onChange={(e) =>
                setNewWidget({ ...newWidget, text: e.target.value })
              }
              className="w-full px-3 py-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleAddWidget}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
              >
                Add Widget
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
