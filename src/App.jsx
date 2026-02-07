import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import TechnologyTrends from "./pages/TechnologyTrends/TechnologyTrends";
import SignalsInbox from "./pages/SignalsInbox/SignalsInbox";
import Alerts from "./pages/Alerts/Alerts";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/technology-trends" element={<TechnologyTrends />} />
          <Route path="/signals-inbox" element={<SignalsInbox />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
