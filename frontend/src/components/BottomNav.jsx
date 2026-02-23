import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  // We define a helper function to keep the NavLink logic clean
  const getLinkStyles = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-0.5 transition-colors ${
      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
    }`;

  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-50 h-14 border-t border-white/10 bg-black/40 backdrop-blur-md shadow-lg"
      role="navigation"
      aria-label="Bottom"
    >
      <div className="mx-auto grid h-full max-w-2xl grid-cols-2">
        <NavLink to="/feed" className={getLinkStyles}>
          <span className="inline-block" aria-hidden="true">
            {/* home icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
            </svg>
          </span>
          <span className="text-[12px] font-medium">Home</span>
        </NavLink>

        <NavLink to="/saved" className={getLinkStyles}>
          <span className="inline-block" aria-hidden="true">
            {/* bookmark icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <span className="text-[12px] font-medium">Saved</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;