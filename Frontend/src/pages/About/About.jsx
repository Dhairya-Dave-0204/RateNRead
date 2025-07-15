import { useState } from "react";
import { motion } from "framer-motion";

function About() {
  const [activeTab, setActiveTab] = useState("mission");

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "At ReadnRate, we believe that reading transforms lives. Our mission is to create a community where book lovers can track their reading journey, share insights, and discover new literary worlds. We're passionate about making the reading experience more connected, organized, and rewarding.",
      icon: <i className="mb-4 text-4xl ri-heart-3-line text-main-border"></i>,
    },
    story: {
      title: "Our Story",
      content:
        "ReadnRate was born from a simple idea: create a platform where readers can easily keep track of books they've read and their thoughts about them. What started as a personal project has evolved into a comprehensive reading companion used by thousands of book enthusiasts worldwide. We continue to grow and improve based on our community's feedback.",
      icon: <i className="mb-4 text-4xl ri-bookmark-3-line text-main-border"></i>,
    },
    values: {
      title: "Our Values",
      content:
        "ReadnRate is built on the principles of literary appreciation, community engagement, and personal growth. We value the unique perspectives each reader brings to a book and believe in the power of shared literary experiences to broaden horizons and deepen understanding.",
      icon: <i className="mb-4 text-4xl ri-sparkling-line text-main-border"></i>,
    },
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen mt-20 bg-background text-primary">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <motion.div
          className="relative z-10 max-w-6xl mx-auto text-center"
          {...fadeUp}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-primary"
          >
            About ReadnRate
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-10 text-xl md:text-2xl text-tertiary"
          >
            Your personal reading journey, organized and shared.
          </motion.p>
          <motion.div
            className="w-24 h-1 mx-auto bg-main-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </motion.div>
        <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 rounded-full bg-main-border opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 rounded-full w-80 h-80 bg-ternary-pink opacity-10"></div>
      </section>

      {/* Tab Section */}
      <section className="px-4 py-16 bg-accent-blue">
        <motion.div className="max-w-6xl mx-auto" {...fadeUp}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(tabContent).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.95 }}
                className={`px-6 cursor-pointer py-3 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? "bg-main-border text-white"
                    : "bg-white text-primary hover:bg-text-pri"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="p-8 bg-white shadow-lg rounded-2xl"
            key={activeTab}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              {tabContent[activeTab].icon}
              <h3 className="mb-4 text-2xl font-bold">
                {tabContent[activeTab].title}
              </h3>
              <p className="max-w-3xl text-lg text-tertiary">
                {tabContent[activeTab].content}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-16 text-center" {...fadeUp}>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Why Choose ReadnRate
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-tertiary">
              Discover the features that make ReadnRate the perfect companion
              for your reading journey.
            </p>
            <div className="w-16 h-1 mx-auto mt-6 bg-main-border"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "ri-book-open-line",
                title: "Track Your Reading",
                desc: "Keep a comprehensive record of all the books you've read, complete with dates, editions, and personal notes.",
              },
              {
                icon: "ri-star-line",
                title: "Rate and Review",
                desc: "Share your thoughts with your own rating system and detailed reviews to remember what you loved (or didn't).",
              },
              {
                icon: "ri-time-line",
                title: "Sort By Recency",
                desc: "Easily organize your reading history chronologically to see your literary journey unfold over time.",
              },
              {
                icon: "ri-file-list-3-line",
                title: "Summarize Books",
                desc: "Create personal summaries to help retain key concepts and revisit your favorite ideas at any time.",
              },
              {
                icon: "ri-folders-line",
                title: "Organized Library",
                desc: "Sort your collection by title, rating, genre, and more for a perfectly organized digital bookshelf.",
              },
              {
                icon: "ri-user-3-line",
                title: "Connect with Readers",
                desc: "Discover like-minded readers and share recommendations to expand your literary horizons.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-block p-4 mb-6 rounded-lg bg-accent-blue">
                  <i className={`${feature.icon} text-main-border text-2xl`}></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-tertiary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="px-4 py-20 text-center text-white bg-primary">
        <motion.div className="max-w-4xl mx-auto" {...fadeUp}>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Motto</h2>
          <p className="mb-8 text-2xl italic font-light md:text-3xl">
            "Every book you read becomes a part of you. Track your journey,
            share your thoughts."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-1 bg-main-border"></div>
            <i className="ri-book-marked-line text-main-border"></i>
            <div className="w-12 h-1 bg-main-border"></div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          {...fadeUp}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Join Our Community
          </h2>
          <p className="max-w-3xl mx-auto mb-10 text-lg text-tertiary">
            ReadnRate is more than just a website—it's a community of
            passionate readers sharing their literary journeys.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-main-border text-white px-8 py-4 rounded-lg font-medium hover:bg-[#3a5bd6] transition-colors"
          >
            Start Your Reading Journal
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
