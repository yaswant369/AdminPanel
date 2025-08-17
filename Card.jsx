import React from "react";

const Card = ({ title, value, percentage, textIcon, color, type, bg }) => {
  return (
    <div
      className={`flex flex-col xs:flex-row items-center gap-3 sm:gap-4 md:gap-5 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] md:hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] ${type}`}
      style={{ backgroundColor: bg }}
    >
      {/* Icon Circle - Responsive sizing */}
      <div
        className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        <span className="text-lg xs:text-xl sm:text-2xl">{textIcon}</span>
      </div>

      {/* Content - Responsive text and spacing */}
      <div className="flex flex-col text-center xs:text-left w-full">
        <h3 className="text-xs xs:text-sm sm:text-[0.8rem] text-zinc-800 opacity-70 mb-0.5 xs:mb-1 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-lg xs:text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] xl:text-[2.2rem] font-bold text-zinc-800 mb-0.5 xs:mb-1 sm:mb-2 leading-tight xs:leading-snug sm:leading-normal">
          {value}
        </p>
        {percentage && (
          <p
            className="text-xs xs:text-sm sm:text-[0.9rem] font-medium"
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
