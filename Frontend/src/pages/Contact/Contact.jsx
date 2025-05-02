import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <div className="h-screen bg-[#f8f8ff] mt-20">
        <div className="px-6 py-12 mx-auto max-w-7xl md:px-12">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c1e] mb-4">
              Get in Touch
            </h1>
            <p className="text-[#a1a1a3] text-lg max-w-2xl mx-auto">
              Have questions about ReadnRate or need help with your reading
              journey? We're here to assist you.
            </p>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-[#f2f2f7] order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-[#1c1c1e] mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#f2f2f7] p-3 rounded-lg mr-4">
                    <i class="ri-mail-line text-xl text-[#4a6cf7]"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3a3a3c]">Email Us</h3>
                    <p className="text-[#a1a1a3] mt-1">support@readnrate.com</p>
                    <p className="text-[#a1a1a3]">info@readnrate.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#f2f2f7] p-3 rounded-lg mr-4">
                    <i class="ri-phone-line text-[#4a6cf7] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3a3a3c]">Call Us</h3>
                    <p className="text-[#a1a1a3] mt-1">+1 (555) 123-4567</p>
                    <p className="text-[#a1a1a3]">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#f2f2f7] p-3 rounded-lg mr-4">
                    <i class="ri-map-pin-line text-[#4a6cf7] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3a3a3c]">Visit Us</h3>
                    <p className="text-[#a1a1a3] mt-1">123 Reading Avenue</p>
                    <p className="text-[#a1a1a3]">Bookville, NY 10001</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-medium text-[#3a3a3c] mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-[#f2f2f7] p-3 rounded-lg hover:bg-[#4a6cf7] hover:text-white transition-colors group"
                  >
                    <i class="ri-linkedin-fill text-[#3a3a3c] group-hover:text-white duration-500 transition-colors text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-[#f2f2f7] p-3 rounded-lg hover:bg-[#4a6cf7] hover:text-white transition-colors group"
                  >
                    <i class="ri-instagram-line text-[#3a3a3c] group-hover:text-white duration-500 transition-colors text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-[#f2f2f7] p-3 rounded-lg hover:bg-[#4a6cf7] hover:text-white transition-colors group"
                  >
                    <i class="ri-github-line text-[#3a3a3c] group-hover:text-white duration-500 transition-colors text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-[#f2f2f7] relative overflow-hidden order-1 lg:order-2">
              {/* Decoration */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#4a6cf7] opacity-10"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-[#f29ca3] opacity-10"></div>

              <h2 className="text-2xl font-bold text-[#1c1c1e] mb-6 relative z-10">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-[#a9e5bb] bg-opacity-20 p-6 rounded-lg border border-[#4caf50] text-center">
                  <div className="mx-auto w-12 h-12 bg-[#4caf50] rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-[#1c1c1e] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#3a3a3c]">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#3a3a3c] mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#f2f2f7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#3a3a3c] mb-1"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#f2f2f7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#3a3a3c] mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#f2f2f7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#3a3a3c] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-[#f2f2f7] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent transition-colors"
                      placeholder="Tell us how we can assist you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="flex cursor-pointer items-center justify-center w-full px-6 py-3 bg-[#4a6cf7] hover:scale-95 transition duration-500 text-white font-medium rounded-lg shadow-md hover:bg-[#4a6cf7]/85 "
                  >
                    Send Message
                    <i class="ri-send-plane-line ml-2 text-xl"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
