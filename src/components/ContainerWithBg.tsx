import React from "react";
import bg from "@/assets/images/hero-bg.jpg";

function ContainerWithBg({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="relative min-h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        {children}
      </div>
    </section>
  );
}

export default ContainerWithBg;