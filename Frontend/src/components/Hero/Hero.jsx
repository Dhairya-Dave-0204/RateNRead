import React, { useEffect, useState } from "react";

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden bg-[#f8f8ff] font-[Inter] flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          {/* Primary gradient blob that moves with mouse */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#4a6cf7]/20 via-transparent to-transparent blur-3xl transition-all duration-700 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${
                mousePosition.y * -20
              }px)`,
            }}
          ></div>

          {/* Secondary gradient blob */}
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#f29ca3]/15 via-[#a9e5bb]/10 to-transparent blur-3xl animate-pulse-slow"></div>

          {/* Accent gradient lines */}
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute left-1/4 top-0 h-screen w-px bg-gradient-to-b from-transparent via-[#4a6cf7] to-transparent animate-glow"></div>
            <div
              className="absolute left-2/4 top-0 h-screen w-px bg-gradient-to-b from-transparent via-[#f29ca3] to-transparent animate-glow"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute left-3/4 top-0 h-screen w-px bg-gradient-to-b from-transparent via-[#a9e5bb] to-transparent animate-glow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(74,108,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,108,247,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Main Content */}
        <div className="container relative z-10 flex flex-col items-center max-w-4xl px-6 mx-auto text-center">
          {/* Animated highlight badge */}
          <div className="relative mb-8 overflow-hidden rounded-full">
            <div className="inline-flex items-center px-6 py-2 border rounded-full bg-white/30 backdrop-blur-sm border-white/40">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a6cf7]/0 via-[#4a6cf7]/10 to-[#4a6cf7]/0 animate-shimmer"></div>
              <span className="relative text-[#1c1c1e] font-medium">
                Your Personal Book Library
              </span>
            </div>
          </div>

          {/* Headline with gradient animated underline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1c1c1e] leading-tight mb-6">
            <span className="relative inline-block">
              Track,
              <div className="absolute bottom-2 left-0 h-3 w-full bg-gradient-to-r from-[#4a6cf7]/40 to-[#f29ca3]/40 rounded-full animate-pulse-slow"></div>
            </span>{" "}
            <span className="relative inline-block">
              Rate
              <div
                className="absolute bottom-2 left-0 h-3 w-full bg-gradient-to-r from-[#f29ca3]/40 to-[#a9e5bb]/40 rounded-full animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              ></div>
            </span>{" "}
            &{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#4a6cf7] to-[#f29ca3] bg-clip-text text-transparent animate-gradient-x">
                Reflect
              </span>
            </span>
            <br />
            on Every Book You Read
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-[#a1a1a3] max-w-2xl mb-10">
            Your personal digital library that evolves with your reading
            journey, designed to capture the essence of every book you
            experience.
          </p>

          {/* CTA Button with gradient animation */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4a6cf7] to-[#f29ca3] rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
            <button className="relative cursor-pointer flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#1c1c1e] font-medium group-hover:text-[#4a6cf7] transition duration-300">
              <span>Start Your Library</span>
              <i class="ri-arrow-right-line ml-2 transition-transform duration-300 group-hover:translate-x-1 text-2xl"></i>
            </button>
          </div>

          {/* Floating Gradient Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-2 border-[#4a6cf7]/5 z-0 animate-spin-slow"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-[#f29ca3]/5 z-0 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Hero;
