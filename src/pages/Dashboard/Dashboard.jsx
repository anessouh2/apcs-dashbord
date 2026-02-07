import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import StatCard from "../../components/dashboard/StatCard/StatCard";
import TechnologySignal from "../../components/dashboard/TechnologySignal/TechnologySignal";
import { Bot, Link2, ArrowRight, Activity, AlertTriangle, Layers } from "lucide-react";
import { api } from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Signals",
      value: "...",
      subtitle: "how many signals entered the pipeline",
      trend: "Loading...",
      type: "signals",
      icon: Activity
    },
    {
      title: "Projects Active",
      value: "...",
      subtitle: "How many projects are currently alive",
      type: "projects",
      icon: Layers
    },
    {
      title: "POC's Running",
      value: "...",
      subtitle: "Experiments in progress",
      trend: "Loading...",
      type: "poc",
      icon: Bot
    },
    {
      title: "Alerts Today",
      value: "...",
      subtitle: "Problems that need attention",
      type: "alerts",
      icon: AlertTriangle
    },
  ]);

  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Signals
        const signalsData = await api.get('/signals?limit=5');

        // Transform backend signal data to frontend format
        // Note: Backend doesn't return urgency/impact yet, so we mock them for now.
        const formattedSignals = signalsData.map(signal => ({
          id: signal.id,
          title: signal.title,
          titleHighlight: signal.title.split(' ').slice(0, 2).join(' '), // Mock highlight
          source: signal.source_name,
          time: new Date(signal.date).toLocaleString(), // Simple formatting
          urgency: Math.floor(Math.random() * 30 + 70).toString(), // Mocked
          impact: Math.floor(Math.random() * 30 + 70).toString(), // Mocked
          tags: ["Tech", "Innovation"], // Mocked
          icon: Bot, // Default icon
        }));
        setSignals(formattedSignals);

        // 2. Fetch Analytics/Dashboard Stats
        const dashboardData = await api.get('/analytics/dashboard');

        // 3. Fetch Alerts (just for count)
        const alertsData = await api.get('/alerts?limit=100');
        const alertCount = alertsData.length;

        // Update Stats
        setStats([
          {
            title: "Total Signals",
            value: dashboardData.metrics?.total_active_sectors?.toString() || signalsData.length.toString(), // Fallback
            subtitle: "how many signals entered the pipeline",
            trend: "+12% from last week",
            type: "signals",
          },
          {
            title: "Projects Active",
            value: dashboardData.metrics?.total_active_sectors?.toString() || "0",
            subtitle: "How many projects are currently alive",
            type: "projects",
          },
          {
            title: "POC's Running",
            value: dashboardData.funnel?.length?.toString() || "0", // Assuming funnel represents POCs
            subtitle: "Experiments in progress",
            trend: "2 nearing completion",
            type: "poc",
          },
          {
            title: "Alerts Today",
            value: alertCount.toString().padStart(2, '0'),
            subtitle: "Problems that need attention",
            type: "alerts",
          },
        ]);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        console.warn("Using fallback demo data. Make sure the backend is running and accessible.");

        // Fallback to demo data
        setStats([
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
        ]);

        setSignals([
          {
            id: 1,
            title: "New AI port management system",
            titleHighlight: "AI",
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          {loading ? (
            <p>Loading signals...</p>
          ) : (
            signals.map((signal) => (
              <TechnologySignal key={signal.id} {...signal} />
            ))
          )}
          {!loading && signals.length === 0 && <p>No signals found.</p>}
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
