import React from "react";

const Card = ({ title, value, percentage, textIcon, color, type, bg }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-5 rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${type}`}
      style={{ backgroundColor: bg }}
    >
      {/* Icon Circle */}
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        <span className="text-xl sm:text-2xl">{textIcon}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col text-center sm:text-left">
        <h3 className="text-sm sm:text-[0.8rem] text-zinc-800 opacity-70 mb-1 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-2xl sm:text-[2.2rem] font-bold text-zinc-800 mb-1 leading-none">
          {value}
        </p>
        {percentage && (
          <p
            className="text-sm sm:text-[0.9rem] font-medium"
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
