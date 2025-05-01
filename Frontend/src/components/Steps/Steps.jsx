import React from "react";

function Steps() {
  const steps = [
    {
      id: 1,
      title: "Create Your Library",
      description:
        "Sign up and start building your personal digital book collection in just a few clicks.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Add Your Books",
      description:
        "Search for books you've read or are currently reading and add them to your collection.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Rate & Reflect",
      description:
        "Add your personal rating, write notes, and capture your thoughts on each book.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Explore & Discover",
      description:
        "Sort your collection, track your reading journey, and discover patterns in your literary adventure.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-[#f8f8ff]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1c1c1e]">
              How It{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4a6cf7] to-[#f29ca3]">
                Works
              </span>
            </h2>
            <p className="text-[#a1a1a3] text-lg max-w-2xl mx-auto">
              Getting started with your personal book tracking journey is
              simple. Follow these steps to begin cataloging your literary
              adventures.
            </p>
          </div>

          {/* Steps - Desktop Version (Hidden on Mobile) */}
          <div className="relative hidden pb-12 lg:block">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#4a6cf7] to-[#f29ca3]"></div>

            {/* Timeline steps */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative z-10 mb-16 last:mb-0 flex ${
                  index % 2 === 0 ? "" : "flex-row-reverse"
                }`}
              >
                {/* Step content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#4a6cf7] h-full">
                    <h3 className="text-xl font-semibold mb-3 text-[#1c1c1e]">
                      {step.title}
                    </h3>
                    <p className="text-[#3a3a3c]">{step.description}</p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border-4 border-[#4a6cf7] text-[#4a6cf7]">
                    {step.id}
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="w-5/12"></div>
              </div>
            ))}

            {/* Final dot */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#4a6cf7] to-[#f29ca3]"></div>
          </div>

          {/* Steps - Mobile & Tablet Version (Hidden on Desktop) */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#4a6cf7] to-[#f29ca3]"></div>

              {/* Step items */}
              {steps.map((step) => (
                <div key={step.id} className="relative pb-12 pl-16 last:pb-0">
                  {/* Step number circle */}
                  <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md border-4 border-[#4a6cf7] text-[#4a6cf7] font-semibold">
                    {step.id}
                  </div>

                  {/* Step content card */}
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4a6cf7]">
                    <h3 className="text-xl font-semibold mb-3 text-[#1c1c1e] flex items-center">
                      <span className="text-[#4a6cf7] mr-3">{step.icon}</span>
                      {step.title}
                    </h3>
                    <p className="text-[#3a3a3c]">{step.description}</p>
                  </div>
                </div>
              ))}

              {/* Final dot */}
              <div className="absolute bottom-0 left-6 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-[#4a6cf7] to-[#f29ca3]"></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="relative inline-block px-10 py-8 overflow-hidden bg-white shadow-xl rounded-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-16 h-16 rounded-br-full bg-gradient-to-br from-[#4a6cf7]/10 to-[#f29ca3]/10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full bg-gradient-to-tl from-[#4a6cf7]/10 to-[#f29ca3]/10"></div>

              <h3 className="text-2xl font-bold mb-3 text-[#1c1c1e]">
                Ready to Start Your Reading Journey?
              </h3>
              <p className="text-[#a1a1a3] mb-6 max-w-lg mx-auto">
                Begin tracking your literary adventures and create a
                personalized record of your reading experiences.
              </p>
              <button className="bg-gradient-to-r cursor-pointer from-[#4a6cf7] to-[#f29ca3] text-white py-3 px-8 rounded-lg font-medium hover:shadow-lg transition duration-300">
                Create Your Library Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Steps;
