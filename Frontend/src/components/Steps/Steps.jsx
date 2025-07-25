import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Steps() {
  const navigate = useNavigate();

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
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl text-primary"
          >
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-main-border to-ternary-pink">
              Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-lg text-text-mute"
          >
            Getting started with your personal book tracking journey is simple.
            Follow these steps to begin cataloging your literary adventures.
          </motion.p>
        </div>

        {/* Desktop Timeline */}
        <div className="relative hidden pb-12 lg:block">
          <div className="absolute w-px h-full transform -translate-x-1/2 left-1/2 bg-gradient-to-b from-main-border to-ternary-pink"></div>

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.id}
                className={`relative z-10 mb-16 last:mb-0 flex ${
                  !isLeft && "flex-row-reverse"
                }`}
              >
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`w-5/12 ${
                    isLeft ? "pr-12 text-right" : "pl-12 text-left"
                  }`}
                >
                  <div className="h-full p-6 bg-white border-t-4 shadow-lg rounded-xl border-main-border">
                    <h3 className="mb-3 text-xl font-semibold text-primary">
                      {step.title}
                    </h3>
                    <p className="text-tertiary">{step.description}</p>
                  </div>
                </motion.div>

                {/* Step Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-6"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-white border-4 rounded-full shadow-lg border-main-border text-main-border">
                    {step.id}
                  </div>
                </motion.div>

                <div className="w-5/12"></div>
              </div>
            );
          })}
          <div className="absolute bottom-0 w-4 h-4 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-main-border to-ternary-pink"></div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute top-0 w-px h-full left-6 bg-gradient-to-b from-main-border to-ternary-pink"></div>
            {steps.map((step, index) => (
              <div key={step.id} className="relative pb-12 pl-16 last:pb-0">
                {/* Step Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute left-0 flex items-center justify-center w-12 h-12 font-semibold bg-white border-4 rounded-full shadow-md border-main-border text-main-border"
                >
                  {step.id}
                </motion.div>

                {/* Step Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white border-l-4 shadow-md rounded-xl border-main-border"
                >
                  <h3 className="flex items-center mb-3 text-xl font-semibold text-primary">
                    <span className="mr-3 text-main-border">{step.icon}</span>
                    {step.title}
                  </h3>
                  <p className="text-tertiary">{step.description}</p>
                </motion.div>
              </div>
            ))}
            <div className="absolute bottom-0 w-3 h-3 transform -translate-x-1/2 rounded-full left-6 bg-gradient-to-r from-main-border to-ternary-pink"></div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block px-10 py-8 overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="absolute top-0 left-0 w-16 h-16 rounded-br-full bg-gradient-to-br from-main-border/10 to-ternary-pink/10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full bg-gradient-to-tl from-main-border/10 to-ternary-pink/10"></div>

            <h3 className="mb-3 text-2xl font-bold text-primary">
              Ready to Start Your Reading Journey?
            </h3>
            <p className="max-w-lg mx-auto mb-6 text-text-mute">
              Begin tracking your literary adventures and create a personalized
              record of your reading experiences.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="px-8 py-3 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-gradient-to-r from-main-border to-ternary-pink hover:shadow-lg"
            >
              Create Your Library Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Steps;
