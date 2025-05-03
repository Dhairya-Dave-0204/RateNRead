import React, { useState } from "react";
import { faqData } from "./data";
import { useNavigate } from "react-router-dom";

// FAQ Accordion Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex items-center justify-between w-full px-4 py-5 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-primary">{question}</h3>
        <div
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 py-4 px-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

// Decorative elements for visual interest
const Decoration = () => (
  <div className="absolute w-full max-w-lg -z-10">
    <div className="absolute top-0 bg-purple-300 rounded-full -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-0 bg-yellow-300 rounded-full -right-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bg-indigo-300 rounded-full -bottom-8 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>
);

function FAQ() {
    const navigate = useNavigate();
    
  return (
    <>
      <div className="relative min-h-screen px-4 py-16 mt-20 overflow-hidden bg-background text-primary sm:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute w-64 h-64 rounded-full top-20 right-1/4 bg-accent-blue mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute w-64 h-64 rounded-full bottom-20 left-1/4 bg-ternary-pink mix-blend-multiply filter blur-3xl opacity-10"></div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="relative mb-16 text-center">
            <Decoration />
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Frequently Asked{" "}
              <span className="text-main-border">Questions</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-text-mute">
              Find answers to common questions about using ReadnRate to track,
              rate, and reflect on your reading journey.
            </p>
          </div>

          {/* Main FAQ Accordion */}
          <div className="p-6 mb-16 shadow-lg bg-white/50 rounded-xl md:p-8">
            <div className="divide-y divide-gray-200">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>

          {/* Still Have Questions Section */}
          <div className="p-8 text-center shadow-md bg-accent-blue rounded-xl">
            <h2 className="mb-4 text-2xl font-semibold">
              Still have questions?
            </h2>
            <p className="mb-6 text-text-mute">
              Can't find the answer you're looking for? Please reach out to our
              customer support team.
            </p>
            <button onClick={() => navigate("/contact")} className="px-6 py-3 font-medium text-white transition duration-500 rounded-lg shadow-md cursor-pointer bg-primary hover:bg-main-border hover:scale-105 hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
