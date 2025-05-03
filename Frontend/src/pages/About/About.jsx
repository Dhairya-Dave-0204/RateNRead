import React, { useState } from "react";

function About() {
  const [activeTab, setActiveTab] = useState("mission");

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "At ReadnRate, we believe that reading transforms lives. Our mission is to create a community where book lovers can track their reading journey, share insights, and discover new literary worlds. We're passionate about making the reading experience more connected, organized, and rewarding.",
      icon: <i class="ri-heart-3-line text-4xl text-[#4a6cf7] mb-4"></i>,
    },
    story: {
      title: "Our Story",
      content:
        "ReadnRate was born from a simple idea: create a platform where readers can easily keep track of books they've read and their thoughts about them. What started as a personal project has evolved into a comprehensive reading companion used by thousands of book enthusiasts worldwide. We continue to grow and improve based on our community's feedback.",
      icon: <i class="ri-bookmark-3-line text-4xl text-[#4a6cf7] mb-4"></i>,
    },
    values: {
      title: "Our Values",
      content:
        "ReadnRate is built on the principles of literary appreciation, community engagement, and personal growth. We value the unique perspectives each reader brings to a book and believe in the power of shared literary experiences to broaden horizons and deepen understanding.",
      icon: <i class="ri-sparkling-line text-4xl text-[#4a6cf7] mb-4"></i>,
    },
  };

  return (
    <>
      <div className="bg-[#f8f8ff] min-h-screen mt-20 text-[#1c1c1e]">
        {/* Hero Section */}
        <section className="relative px-4 py-20 overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1c1c1e]">
              About ReadnRate
            </h1>
            <p className="text-xl md:text-2xl text-[#3a3a3c] max-w-3xl mx-auto mb-10">
              Your personal reading journey, organized and shared.
            </p>
            <div className="w-24 h-1 bg-[#4a6cf7] mx-auto"></div>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#4a6cf7] opacity-10"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#f29ca3] opacity-10"></div>
        </section>

        {/* Tab Section */}
        <section className="py-16 px-4 bg-[#f2f2f7]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 cursor-pointer py-3 rounded-full font-medium transition-all ${
                    activeTab === tab
                      ? "bg-[#4a6cf7] text-white"
                      : "bg-white text-[#1c1c1e] hover:bg-[#e5e5e7]"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-8 bg-white shadow-lg rounded-2xl">
              <div className="flex flex-col items-center text-center">
                {tabContent[activeTab].icon}
                <h3 className="mb-4 text-2xl font-bold">
                  {tabContent[activeTab].title}
                </h3>
                <p className="text-lg text-[#3a3a3c] max-w-3xl">
                  {tabContent[activeTab].content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Why Choose ReadnRate
              </h2>
              <p className="text-lg text-[#3a3a3c] max-w-3xl mx-auto">
                Discover the features that make ReadnRate the perfect companion
                for your reading journey.
              </p>
              <div className="w-16 h-1 bg-[#4a6cf7] mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                <div className="bg-[#f2f2f7] p-4 inline-block rounded-lg mb-6">
                  <i class="ri-book-open-line text-[#4a6cf7] text-2xl"></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">Track Your Reading</h3>
                <p className="text-[#3a3a3c]">
                  Keep a comprehensive record of all the books you've read,
                  complete with dates, editions, and personal notes.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                <div className="bg-[#f2f2f7] p-4 inline-block rounded-lg mb-6">
                  <i class="ri-star-line text-[#4a6cf7] text-2xl"></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">Rate and Review</h3>
                <p className="text-[#3a3a3c]">
                  Share your thoughts with your own rating system and detailed
                  reviews to remember what you loved (or didn't).
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                <div className="bg-[#f2f2f7] p-4 inline-block rounded-lg mb-6">
                  <i class="ri-time-line text-[#4a6cf7] text-2xl"></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">Sort By Recency</h3>
                <p className="text-[#3a3a3c]">
                  Easily organize your reading history chronologically to see
                  your literary journey unfold over time.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                <div className="bg-[#f2f2f7] p-4 inline-block rounded-lg mb-6">
                  <i class="ri-file-list-3-line text-[#4a6cf7] text-2xl"></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">Summarize Books</h3>
                <p className="text-[#3a3a3c]">
                  Create personal summaries to help retain key concepts and
                  revisit your favorite ideas at any time.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                <div className="bg-[#f2f2f7] p-4 inline-block rounded-lg mb-6">
                  <i class="ri-folders-line text-[#4a6cf7] text-2xl"></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">Organized Library</h3>
                <p className="text-[#3a3a3c]">
                  Sort your collection by title, rating, genre, and more for a
                  perfectly organized digital bookshelf.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-8 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
                <div className="bg-[#f2f2f7] p-4 inline-block rounded-lg mb-6">
                  <i class="ri-user-3-line text-[#4a6cf7] text-2xl"></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">Connect with Readers</h3>
                <p className="text-[#3a3a3c]">
                  Discover like-minded readers and share recommendations to
                  expand your literary horizons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Motto Section */}
        <section className="py-20 px-4 bg-[#1c1c1e] text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Motto</h2>
            <p className="mb-8 text-2xl italic font-light md:text-3xl">
              "Every book you read becomes a part of you. Track your journey,
              share your thoughts."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-1 bg-[#4a6cf7]"></div>
              <i class="ri-book-marked-line text-[#4a6cf7]"></i>
              <div className="w-12 h-1 bg-[#4a6cf7]"></div>
            </div>
          </div>
        </section>

        {/* Team/CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Join Our Community
            </h2>
            <p className="text-lg text-[#3a3a3c] max-w-3xl mx-auto mb-10">
              ReadnRate is more than just a website—it's a community of
              passionate readers sharing their literary journeys.
            </p>
            <a
              href="#"
              className="inline-block bg-[#4a6cf7] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#3a5bd6] transition-colors"
            >
              Start Your Reading Journal
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
