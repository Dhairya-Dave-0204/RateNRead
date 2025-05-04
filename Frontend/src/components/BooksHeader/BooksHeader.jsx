import React from "react";

function BooksHeader() {
  return (
    <>
      <section className="w-full px-6 py-16 mt-20 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-2 text-sm font-medium tracking-wide uppercase text-main-border">
            Explore Books
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl text-primary">
            Discover, Track & <span className="bg-gradient-to-r from-main-border via-[#a29bfe] to-ternary-pink text-transparent bg-clip-text">Read</span>
          </h1>
          <p className="max-w-xl mx-auto text-base text-text-mute">
            Browse the latest and most popular books, and add your favorites to
            your personal library. Stay organized and inspired.
          </p>
        </div>
      </section>
    </>
  );
}

export default BooksHeader;
