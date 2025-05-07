import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate()

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
      <div className="relative flex items-center justify-center h-screen overflow-hidden bg-background">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          {/* Primary gradient blob that moves with mouse */}
          <div
            className="absolute w-full h-full transition-all duration-700 ease-out bg-gradient-to-br from-main-border/20 via-transparent to-transparent blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${
                mousePosition.y * -20
              }px)`,
            }}
          ></div>

          {/* Secondary gradient blob */}
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-ternary-pink/15 via-ternary-mint/10 to-transparent blur-3xl animate-pulse-slow"></div>

          {/* Accent gradient lines */}
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute top-0 w-px h-screen left-1/4 bg-gradient-to-b from-transparent via-main-border to-transparent animate-glow"></div>
            <div
              className="absolute top-0 w-px h-screen left-2/4 bg-gradient-to-b from-transparent via-ternary-pink to-transparent animate-glow"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-0 w-px h-screen left-3/4 bg-gradient-to-b from-transparent via-ternary-mint to-transparent animate-glow"
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
              <div className="absolute inset-0 bg-gradient-to-r from-main-border/0 via-main-border/10 to-main-border/0 animate-shimmer"></div>
              <span className="relative font-medium text-primary">
                Your Personal Book Library
              </span>
            </div>
          </div>

          {/* Headline with gradient animated underline */}
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            <span className="relative inline-block">
              Track,
              <div className="absolute left-0 w-full h-3 rounded-full bottom-2 bg-gradient-to-r from-main-border/40 to-ternary-pink/40 animate-pulse-slow"></div>
            </span>{" "}
            <span className="relative inline-block">
              Rate
              <div
                className="absolute left-0 w-full h-3 rounded-full bottom-2 bg-gradient-to-r from-ternary-pink/40 to-ternary-mint/40 animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              ></div>
            </span>{" "}
            &{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-gradient-to-r from-main-border to-ternary-pink bg-clip-text animate-gradient-x">
                Reflect
              </span>
            </span>
            <br />
            on Every Book You Read
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mb-10 text-lg md:text-xl text-text-mute">
            Your personal digital library that evolves with your reading
            journey, designed to capture the essence of every book you
            experience.
          </p>

          {/* CTA Button with gradient animation */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-main-border to-ternary-pink rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
            <button onClick={() => navigate("/signin")} className="relative flex items-center justify-center px-8 py-4 font-medium transition duration-300 bg-white rounded-full cursor-pointer text-primary group-hover:text-main-border">
              <span>Start Your Library</span>
              <i className="ml-2 text-2xl transition-transform duration-300 ri-arrow-right-line group-hover:translate-x-1"></i>
            </button>
          </div>

          {/* Floating Gradient Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-2 border-main-border/5 z-0 animate-spin-slow"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-ternary-pink/5 z-0 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Hero;
