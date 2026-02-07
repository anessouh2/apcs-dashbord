import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import StatCard from "../../components/dashboard/StatCard/StatCard";
import TechnologySignal from "../../components/dashboard/TechnologySignal/TechnologySignal";
import { Bot, Link2, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Signals",
      value: "105",
      subtitle: "how many signals entered the pipeline",
      trend: "+10 signals added from last week",
      type: "signals",
    },
    {
      title: "Projects Active",
      value: "45",
      subtitle: "How many projects are currently alive",
      type: "projects",
    },
    {
      title: "POC's Running",
      value: "07",
      subtitle: "Experiments in progress",
      trend: "2 nearing completion",
      type: "poc",
    },
    {
      title: "Alerts Today",
      value: "05",
      subtitle: "Problems that need attention",
      type: "alerts",
    },
  ];

  const signals = [
    {
      id: 1,
      title: "New Ai port management system",
      titleHighlight: "Ai",
      source: "TechCrunch",
      time: "2h ago",
      urgency: "85",
      impact: "70",
      tags: ["AI", "IoT"],
      icon: Bot,
    },
    {
      id: 2,
      title: "Blockchain for Cargo Tracking",
      titleHighlight: "Blockchain",
      source: "Reuters",
      time: "5h ago",
      urgency: "70",
      impact: "85",
      tags: ["Blockchain"],
      icon: Link2,
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-description">
          This dashboard provides a real-time overview of the transportation
          pipeline, tracking each stage from signal detection to deployment,
          enabling faster decisions, better coordination, and improved
          operational efficiency
        </p>
      </header>

      <section className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>

      <section className="signals-section">
        <div className="signals-header">
          <h2 className="signals-section-title">Recent Technology Signals</h2>
          <button className="view-all-btn">View all</button>
        </div>

        <div className="signals-list">
          {signals.map((signal) => (
            <TechnologySignal key={signal.id} {...signal} />
          ))}
        </div>

        <div className="fab-container">
          <Link to="/technology-trends" className="fab-btn">
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
