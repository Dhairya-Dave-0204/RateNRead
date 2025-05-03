import React, { useState } from "react";

function Features() {
  const features = [
    {
      id: 1,
      title: "Track Your Reading Journey",
      description:
        "Easily log and organize every book you've read in your personal digital library.",
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Rate & Review",
      description:
        "Add personal ratings and detailed notes to capture your thoughts on each book.",
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
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Sort & Organize",
      description:
        "Find books quickly by sorting your collection by recency, rating, or alphabetically.",
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
          <line x1="21" y1="10" x2="3" y2="10"></line>
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="21" y1="14" x2="3" y2="14"></line>
          <line x1="21" y1="18" x2="3" y2="18"></line>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Reflect & Remember",
      description:
        "Document your reading experience with reflections that evolve with your journey.",
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
  ];

  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-accent-blue">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary">
            Your Reading Journey,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-main-border to-ternary-pink">
              Elevated
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-mute">
            Discover a new way to connect with your books through personalized tracking, thoughtful organization, and meaningful reflection.
          </p>
        </div>

        {/* Features Display */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Feature Tabs - Mobile Accordion/Desktop Tabs */}
          <div className="space-y-4 lg:mt-8">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeFeature === feature.id 
                    ? "bg-white shadow-lg border-l-4 border-main-border" 
                    : "bg-accent-blue hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg mr-4 ${
                    activeFeature === feature.id 
                      ? "bg-main-border text-white" 
                      : "bg-white text-main-border"
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-primary">{feature.title}</h3>
                    <p className={`transition-all duration-300 ${
                      activeFeature === feature.id 
                        ? "text-tertiary block" 
                        : "text-text-mute lg:hidden"
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Illustration */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 relative overflow-hidden h-full min-h-[400px] flex items-center justify-center">
            {activeFeature === 1 && (
              <div className="w-full max-w-md mx-auto animate-fade-in">
                <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-primary">Recently Added</div>
                    <div className="text-sm text-main-border">View All</div>
                  </div>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="w-8 h-12 mr-3 rounded bg-gradient-to-br from-main-border to-ternary-pink"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary">Book Title {item}</div>
                        <div className="text-xs text-text-mute">Author Name</div>
                      </div>
                      <div className="text-xs text-text-mute">Today</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button className="px-4 py-2 text-sm text-white transition rounded-lg bg-main-border hover:bg-blue-600">
                    Add New Book
                  </button>
                </div>
              </div>
            )}

            {activeFeature === 2 && (
              <div className="w-full max-w-md mx-auto animate-fade-in">
                <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg">
                  <div className="mb-4">
                    <div className="mb-1 font-medium text-primary">Project Hail Mary</div>
                    <div className="mb-2 text-sm text-text-mute">by Andy Weir</div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-main-border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-tertiary">Your Notes</label>
                    <div className="p-3 text-sm rounded bg-background text-tertiary">
                      An incredible sci-fi story with fascinating scientific concepts. The protagonist's journey and problem-solving approach kept me engaged throughout...
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="text-sm text-main-border hover:underline">Edit Review</button>
                  </div>
                </div>
              </div>
            )}

            {activeFeature === 3 && (
              <div className="w-full max-w-md mx-auto animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium text-primary">Your Collection</div>
                  <div className="flex p-1 rounded-lg bg-background">
                    <button className="px-3 py-1 text-xs text-white rounded bg-main-border">Recent</button>
                    <button className="px-3 py-1 text-xs rounded text-tertiary">Rating</button>
                    <button className="px-3 py-1 text-xs rounded text-tertiary">Title</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Atomic Habits", author: "James Clear", rating: 5 },
                    { title: "Dune", author: "Frank Herbert", rating: 4 },
                    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 3 }
                  ].map((book, idx) => (
                    <div key={idx} className="flex items-center p-3 rounded-lg bg-background">
                      <div className="w-8 h-12 mr-3 rounded bg-gradient-to-br from-ternary-mint to-main-border"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary">{book.title}</div>
                        <div className="text-xs text-text-mute">{book.author}</div>
                      </div>
                      <div className="flex">
                        {Array(book.rating).fill(0).map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-main-border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFeature === 4 && (
              <div className="w-full max-w-md mx-auto animate-fade-in">
                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="mb-4">
                    <div className="mb-1 font-medium text-primary">Reading Insights</div>
                    <div className="text-sm text-text-mute">Your reading patterns and reflections</div>
                  </div>
                  <div className="mb-6">
                    <div className="h-4 mb-1 rounded-full bg-background">
                      <div className="h-4 rounded-full bg-gradient-to-r from-main-border to-ternary-mint" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-mute">2024 Reading Goal</span>
                      <span className="text-tertiary">26/40 books</span>
                    </div>
                  </div>
                  <div className="p-4 mb-4 rounded-lg bg-background">
                    <div className="mb-2 text-sm font-medium text-primary">Your Reading Journey</div>
                    <div className="flex justify-between mb-3">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
                        <div key={month} className="flex flex-col items-center">
                          <div className="relative w-6 h-16 overflow-hidden rounded-t-sm bg-text-pri">
                            <div 
                              className="absolute bottom-0 w-full bg-main-border" 
                              style={{ height: `${Math.floor(Math.random() * 100)}%` }}
                            ></div>
                          </div>
                          <div className="mt-1 text-xs text-text-mute">{month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-center text-text-mute">
                    Track your reading habits over time and discover your literary journey
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Features;
