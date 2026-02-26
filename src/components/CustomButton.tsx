import React from "react";

function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative overflow-hidden border border-[#1a1a1a] px-10 py-4 transition-all duration-500">
      <span className="relative z-10 text-[#1a1a1a] text-[0.6rem] tracking-[0.5em] uppercase font-bold group-hover:text-white transition-colors duration-500">
        {children}
      </span>
      <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
    </button>
  );
}

export default CustomButton;
