import React, { useState } from "react";
import { Bell, Zap, SquarePen } from "lucide-react";
import "./Alerts.css";
import useNotifications from "../../hooks/useNotifications";
import NotificationCard from "../../components/notifications/NotificationCard/NotificationCard";
import CreateAlertRuleModal from "../../components/modals/CreateAlertRuleModal/CreateAlertRuleModal";

const Alerts = () => {
  const { grouped, loading, error, markAsRead } = useNotifications();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (id) => {
    markAsRead(id);
  };

  const handleCreateRule = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAlertCreated = (result) => {
    console.log("Alert rule created:", result);
    // Optionally refresh data or show success toast
  };

  return (
    <div className="alerts-page">
      {/* ── Page header ── */}
      <div className="alerts-header">
        <div className="alerts-header__left">
          <Bell size={30} strokeWidth={2.2} />
          <h1 className="alerts-header__title">Alerts &amp; Notifications</h1>
        </div>
        <button className="alerts-header__btn" onClick={handleCreateRule}>
          <SquarePen size={20} />
          <span>Create new Alert Rule</span>
        </button>
      </div>

      {/* ── Section heading ── */}
      <h2 className="alerts-section-title">Recent Notifications</h2>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="alerts-loading">
          {[1, 2].map((i) => (
            <div key={i} className="alerts-skeleton">
              <div className="alerts-skel-time" />
              <div className="alerts-skel-card">
                <div className="alerts-skel-line w50" />
                <div className="alerts-skel-line w80" />
                <div className="alerts-skel-line w60" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Error state ── */}
      {error && (
        <div className="alerts-error">
          <p>Failed to load notifications. Please try again.</p>
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && grouped.length === 0 && (
        <div className="alerts-empty">
          <p>No new notifications</p>
        </div>
      )}

      {/* ── Notification groups ── */}
      {!loading &&
        !error &&
        grouped.map((group, gi) => (
          <div className="notification-group" key={gi}>
            <div className="notification-group__header">
              <Zap size={22} strokeWidth={2.4} />
              <span className="notification-group__time">{group.label}</span>
            </div>
            {group.notifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ))}

      {/* ── Create Alert Rule Modal ── */}
      <CreateAlertRuleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAlertCreated}
      />
    </div>
  );
};

export default Alerts;
