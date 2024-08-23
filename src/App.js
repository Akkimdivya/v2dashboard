import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Category from "./components/Category";
import DashTitle from "./components/DashTitle";
import ErrorBoundary from "./components/ErrorBoundary";
import { DashboardProvider } from "./context/DashboardContext";
import Navbar from "./components/Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ErrorBoundary>
      <DashboardProvider>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <DashTitle />
        <Category searchQuery={searchQuery} />
        <Sidebar />
      </DashboardProvider>
    </ErrorBoundary>
  );
}

export default App;
