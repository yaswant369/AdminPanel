import React from "react";

const Card = ({ title, value, percentage, textIcon, color, type, bg }) => {
  return (
    <div
      className={`flex items-center gap-5 rounded-xl p-[20px] px-[25px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${type}`}
      style={{ backgroundColor: bg }}
    >
      {/* Icon Circle */}
      <div
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        <span className="text-[2rem]">{textIcon}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h3 className="text-[0.8vh] text-[var(--text-color)] opacity-70 mb-[5px] uppercase tracking-[0.5px]">
          {title}
        </h3>
        <p className="text-[2.2rem] font-bold text-[var(--text-color)] mb-[5px] leading-[1]">
          {value}
        </p>
        {percentage && (
          <p
            className="text-[0.9rem] font-medium"
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
