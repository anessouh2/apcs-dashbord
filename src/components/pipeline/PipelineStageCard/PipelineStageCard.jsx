import React from "react";
import "./PipelineStageCard.css";

const PipelineStageCard = ({ stage, onClick }) => {
  return (
    <div className="stage-card">
      <div className="stage-card__header">
        <h3 className="stage-card__title">{stage.name}</h3>
      </div>
      <div className="stage-card__body">
        <span className="stage-card__count">{stage.count}</span>
        <span className="stage-card__label">Projects</span>
      </div>
      <button
        className="stage-card__btn"
        onClick={() => onClick && onClick(stage)}
      >
        Click to view
      </button>
    </div>
  );
};

export default PipelineStageCard;
