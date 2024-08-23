import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { getCategoryNames } from "../utils/categoryUtils";
import { getWidgetNames } from "../utils/widgetUtils";

const CategoryList = () => {
  const context = useContext(DashboardContext);

  // Initialize hooks before any return
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  useEffect(() => {
    if (context && context.activeCategory) {
      const activeCategoryData = context.categories.find(
        (category) => category.category === context.activeCategory
      );
      if (activeCategoryData) {
        setSelectedWidgets(
          activeCategoryData.widgets
            .filter((widget) => widget.status === "active")
            .map((widget) => widget.name)
        );
      }
    }
  }, [context]);

  // Return early if context is undefined
  if (!context) {
    console.error("DashboardContext is undefined");
    return null;
  }

  const {
    categories,
    setActiveCategory,
    activeCategory,
    removeCategory,
    updateWidgetStatus,
  } = context;
  const categoryNames = getCategoryNames(categories);
  const widgetNames = getWidgetNames(categories);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleRemoveCategory = (categoryName, e) => {
    e.stopPropagation();
    removeCategory(categoryName);
  };

  const handleCheckboxChange = (widgetName) => {
    setSelectedWidgets((prevSelectedWidgets) =>
      prevSelectedWidgets.includes(widgetName)
        ? prevSelectedWidgets.filter((name) => name !== widgetName)
        : [...prevSelectedWidgets, widgetName]
    );

    const widgetStatus = selectedWidgets.includes(widgetName)
      ? "inactive"
      : "active";
    updateWidgetStatus(activeCategory, widgetName, widgetStatus);
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>Check to see Items...!</p>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {categoryNames.map((name, index) => (
          <li
            key={index}
            style={{
              cursor: "pointer",
              color: activeCategory === name ? "blue" : "black",
              fontWeight: "bold",
              padding: "10px",
              backgroundColor:
                activeCategory === name ? "#f0f8ff" : "transparent",
              borderRadius: "5px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              boxShadow:
                activeCategory === name
                  ? "0px 4px 6px rgba(0, 0, 0, 0.1)"
                  : "none",
            }}
            onClick={() => handleCategoryClick(name)}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  flex: "1",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </span>
              <button
                onClick={(e) => handleRemoveCategory(name, e)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  fontSize: "0.8rem",
                  marginLeft: "10px",
                  flexShrink: "0",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "darkred")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "red")}
              >
                Delete
              </button>
            </div>
            {activeCategory === name && (
              <ul
                style={{
                  listStyle: "none",
                  padding: "10px 0 0 20px",
                  marginTop: "10px",
                  width: "100%",
                  alignItem: "left",
                }}
              >
                {widgetNames
                  .filter((item) => item.category === name)
                  .map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: "5px 0",
                        color: "gray",
                        fontWeight: "normal",
                        transition: "color 0.3s ease",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", }}>
                        <input
                          type="checkbox"
                          checked={selectedWidgets.includes(item.widget)}
                          onChange={() => handleCheckboxChange(item.widget)}
                          style={{ marginRight: "10px" }} // Adds space between the checkbox and text
                        />
                        <span>{item.widget}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
