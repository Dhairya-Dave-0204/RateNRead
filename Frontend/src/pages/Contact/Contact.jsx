import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

  const toastDisplay = (message, status) => {
    if (status) {
      toast.success(message, {});
    } else {
      toast.error(message, {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "a14bf5dd-003f-4db0-8b16-d1545324aae9",
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      toastDisplay("Form Submitted Successfully", true);
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3500);
    } else {
      toastDisplay("Error in submitting the form", false);
    }
  };

  return (
    <>
      <main className="h-screen mt-20 bg-background">
        <div className="px-6 py-12 mx-auto max-w-7xl md:px-12">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl text-primary">
              Get in Touch
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-text-mute">
              Have questions about ReadnRate or need help with your reading
              journey? We're here to assist you.
            </p>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="order-2 p-8 bg-white border shadow-md rounded-2xl border-accent-blue lg:order-1">
              <h2 className="mb-6 text-2xl font-bold text-primary">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 mr-4 rounded-lg bg-accent-blue">
                    <i class="ri-mail-line text-xl text-main-border"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-tertiary">Email Us</h3>
                    <p className="mt-1 text-text-mute">support@readnrate.com</p>
                    <p className="text-text-mute">info@readnrate.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 mr-4 rounded-lg bg-accent-blue">
                    <i class="ri-phone-line text-main-border text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-tertiary">Call Us</h3>
                    <p className="mt-1 text-text-mute">+1 (555) 123-4567</p>
                    <p className="text-text-mute">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 mr-4 rounded-lg bg-accent-blue">
                    <i class="ri-map-pin-line text-main-border text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-tertiary">Visit Us</h3>
                    <p className="mt-1 text-text-mute">123 Reading Avenue</p>
                    <p className="text-text-mute">Bookville, NY 10001</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-4 text-lg font-medium text-tertiary">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <Link
                    to={"https://linkedin.com/in/davedhairya"}
                    className="p-3 transition-colors rounded-lg bg-accent-blue hover:bg-main-border hover:text-white group"
                  >
                    <i class="ri-linkedin-fill text-tertiary group-hover:text-white duration-500 transition-colors text-xl"></i>
                  </Link>
                  <Link
                    to={"https://www.instagram.com/ig_dhairya_962"}
                    className="p-3 transition-colors rounded-lg bg-accent-blue hover:bg-main-border hover:text-white group"
                  >
                    <i class="ri-instagram-line text-tertiary group-hover:text-white duration-500 transition-colors text-xl"></i>
                  </Link>
                  <Link
                    to={"https://github.com/Dhairya-Dave-0204"}
                    className="p-3 transition-colors rounded-lg bg-accent-blue hover:bg-main-border hover:text-white group"
                  >
                    <i class="ri-github-line text-tertiary group-hover:text-white duration-500 transition-colors text-xl"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative order-1 p-8 overflow-hidden bg-white border shadow-md rounded-2xl border-accent-blue lg:order-2">
              {/* Decoration */}
              <div className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-main-border opacity-10"></div>
              <div className="absolute w-20 h-20 rounded-full -bottom-10 -left-10 bg-ternary-pink opacity-10"></div>

              <h2 className="relative z-10 mb-6 text-2xl font-bold text-primary">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-ternary-mint bg-opacity-20 p-6 rounded-lg border border-accent-green text-center h-[90%] flex items-center justify-center flex-col">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-accent-green">
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
                  <h3 className="mb-2 text-2xl font-semibold text-primary">
                    Message Sent!
                  </h3>
                  <p className="text-lg text-tertiary">
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
                        className="block mb-1 text-sm font-medium text-tertiary"
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
                        className="w-full px-4 py-3 transition-colors border rounded-lg border-accent-blue focus:outline-none focus:ring-2 focus:ring-main-border focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-tertiary"
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
                        className="w-full px-4 py-3 transition-colors border rounded-lg border-accent-blue focus:outline-none focus:ring-2 focus:ring-main-border focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 text-sm font-medium text-tertiary"
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
                      className="w-full px-4 py-3 transition-colors border rounded-lg border-accent-blue focus:outline-none focus:ring-2 focus:ring-main-border focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 text-sm font-medium text-tertiary"
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
                      className="w-full px-4 py-3 transition-colors border rounded-lg border-accent-blue focus:outline-none focus:ring-2 focus:ring-main-border focus:border-transparent"
                      placeholder="Tell us how we can assist you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-6 py-3 font-medium text-white transition duration-500 rounded-lg shadow-md cursor-pointer bg-main-border hover:scale-95 hover:bg-main-border/85 "
                  >
                    Send Message
                    <i class="ri-send-plane-line ml-2 text-xl"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
