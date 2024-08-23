import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { VscGraph } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { DashboardContext } from "../context/DashboardContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function Widget({ widget, category }) {
  const { updateWidgetStatus } = useContext(DashboardContext);

  const getBarColor = (index) => {
    const colors = ["#d32f2f", "#FFEB3B", "#FF9800", "#E0E0E0"]; // Adjust colors as needed
    return colors[index % colors.length];
  };

  const renderWidgetContent = () => {
    switch (widget?.type) {
      case "doughnut":
        const doughnutData = {
          labels: widget.data.labels,
          datasets: [
            {
              data: widget.data.value,
              backgroundColor: ["blue", "red", "#FF9800", "#388E3C"],
              borderWidth: 0,
              hoverOffset: 5,
            },
          ],
        };

        const doughnutOptions = {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          cutout: "70%",
        };

        return (
          <div className="flex items-center justify-between w-[100%]">
            <div
              className="relative"
              style={{ width: "160px", height: "150px" }}
            >
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                {widget.data.total}
                <br />
                Total
              </div>
            </div>
            <div className="mt-4 mr-4">
              <ul className="text-xs">
                {widget.data.labels.map((label, index) => (
                  <li className="flex items-center mb-1" key={index}>
                    <span
                      className="inline-block w-3 h-3 mr-2 rounded-sm"
                      style={{
                        backgroundColor: [
                          "red",
                          "blue",
                          "#FFEB3B",
                          "#FF9800",
                          "#388E3C",
                        ][index],
                      }}
                    ></span>
                    {label} ({widget.data.value[index]})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "progress":
        return (
          <div>
            <h3>{widget.name}</h3>
            <div
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                height: "20px",
                marginTop: "16px",
                display: "flex",
                position: "relative",
              }}
            >
              {widget.data.labels.map((label, index) => {
                const percentage = (
                  (widget.data.value[index] / widget.data.total) *
                  100
                ).toFixed(2);
                return (
                  <div
                    key={index}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getBarColor(index),
                      height: "100%",
                      display: "inline-block",
                    }}
                    title={`${label}: ${widget.data.value[index]} (${percentage}%)`}
                  />
                );
              })}
            </div>
            <ul className="text-xs" style={{ marginTop: "8px" }}>
              {widget.data.labels.map((label, index) => {
                const percentage = (
                  (widget.data.value[index] / widget.data.total) *
                  100
                ).toFixed(2);
                return (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      className="inline-block w-3 h-3 mr-2 rounded-sm"
                      style={{
                        backgroundColor: getBarColor(index),
                      }}
                    ></span>
                    <strong>{label}:</strong> {widget.data.value[index]} (
                    {percentage}%)
                  </li>
                );
              })}
            </ul>
          </div>
        );

      // Add more cases for other chart types here if needed

      default:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
              textAlign: "center",
            }}
          >
            <div className="opacity-55 text-[3rem]">
              <VscGraph />
            </div>
            <div>No data available</div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white px-2 py-1 rounded-lg shadow-lg w-[360px] h-[14rem] flex flex-col">
      <div className="flex justify-between items-center">
        <h6 className="text-sm font-bold mb-8">{widget?.name}</h6>
        <button
          className="mb-8"
          onClick={() => updateWidgetStatus(category, widget.name, "inactive")}
        >
          <RxCross2 />
        </button>
      </div>

      {renderWidgetContent()}
    </div>
  );
}

export default Widget;
