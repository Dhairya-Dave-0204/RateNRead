import React, { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log("Sign-in attempt:", { email, password, rememberMe });
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8f8ff] flex flex-col">
        {/* Main Content */}
        <main className="flex items-center justify-center flex-grow px-4 py-12">
          <div className="flex flex-col w-full max-w-5xl overflow-hidden shadow-lg md:flex-row rounded-xl">
            {/* Left Side - Image/Branding */}
            <div className="bg-[#1c1c1e] text-[#e5e5e7] w-full md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6">
                  <i class="ri-book-open-line text-[#4a6cf7] mr-2 text-xl"></i>
                  <h1 className="text-3xl font-bold">ReadnRate</h1>
                </div>
                <h2 className="mb-4 text-2xl font-semibold">
                  Track Your Reading Journey
                </h2>
                <p className="text-[#a1a1a3] mb-8">
                  Sign in to access your personal library, rate books, and keep
                  track of all your literary adventures.
                </p>
              </div>

              <div className="hidden md:block">
                <div className="flex mb-8 space-x-4">
                  {/* Feature points */}
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-start">
                      <div className="bg-[#3a3a3c] rounded-full p-2 mr-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                            fill="#4a6cf7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Track Books</h3>
                        <p className="text-sm text-[#a1a1a3]">
                          Keep a record of books you've read
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[#3a3a3c] rounded-full p-2 mr-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                            fill="#4a6cf7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Rate & Review</h3>
                        <p className="text-sm text-[#a1a1a3]">
                          Share your thoughts and ratings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[#3a3a3c] rounded-full p-2 mr-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                            fill="#4a6cf7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Organize Collection</h3>
                        <p className="text-sm text-[#a1a1a3]">
                          Sort by recency, rating, or title
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full p-8 bg-white md:w-1/2">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-[#1c1c1e] mb-2">
                  Welcome back
                </h2>
                <p className="text-[#a1a1a3] mb-8">
                  Please sign in to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#2c2c2e] mb-1"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent"
                        placeholder="Enter your email"
                      />
                      <i class="ri-mail-line absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 text-lg"></i>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="flex justify-between mb-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[#2c2c2e]"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-[#4a6cf7] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent"
                        placeholder="Enter your password"
                      />
                      <i class="ri-lock-line absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 text-lg"></i>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                      >
                        {showPassword ? (
                          <i class="ri-eye-off-line text-lg"></i>
                        ) : (
                          <i class="ri-eye-line text-lg"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#4a6cf7] rounded border-gray-300 focus:ring-[#4a6cf7]"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-[#3a3a3c]"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#4a6cf7] text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <span>Sign In</span>
                    <i class="ri-arrow-right-fill ml-2 text-lg"></i>
                  </button>

                  {/* Sign Up Link */}
                  <div className="mt-6 text-center">
                    <p className="text-[#a1a1a3]">
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        className="text-[#4a6cf7] font-medium hover:underline"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>

                  {/* Alternative Sign In */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-[#a1a1a3]">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            fill="#1877F2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
