import React from "react";
import "./Card.css";

const Card = ({ title, value, percentage, textIcon, color, type, bg }) => {
  // Changed 'icon' to 'textIcon'
  return (
    <div className={`card ${type}  `} style={{ backgroundColor: `${bg} ` }}>
      <div className="card-icon" style={{ backgroundColor: color }}>
        <span className="card-text-icon">{textIcon}</span>{" "}
        {/* Use text-based icon */}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
        {percentage && (
          <p
            className="card-percentage"
            style={{
              color: percentage.startsWith("-")
                ? "var(--danger-color)"
                : "var(--secondary-color)",
            }}
          >
            {percentage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
