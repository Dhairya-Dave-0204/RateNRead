import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { backendUrl, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to handle manual login via form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success === false) {
        toast.error("Account not found. Please sign up first.");
        return;
      }
      setUser(true);
      toast.success("Sigin in successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error + "Sign in error");
      toast.error("Invalid email or password");
    }
  };

  // Handle Google login success
  const handleGoogleSignIn = () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  };
  
  return (
    <>
      <div className="min-h-screen bg-[#f8f8ff] flex flex-col">
        {/* Main Content */}
        <main className="flex items-center justify-center flex-grow px-4 py-12">
          <div className="flex flex-col w-full max-w-5xl overflow-hidden shadow-lg md:flex-row rounded-xl">
            {/* Left Side - Sign In Form */}
            <div className="w-full p-8 bg-white md:w-1/2">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-[#1c1c1e] mb-2">
                  Welcome back to ReadnRate
                </h2>
                <p className="text-[#a1a1a3] mb-8">
                  Sign in to continue your reading journey
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#2c2c2e] mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 pl-10 rounded-lg border border-[#3a3a3c] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      <i className="ri-mail-line absolute text-[#a1a1a3] transform -translate-y-1/2 left-3 top-1/2 text-lg"></i>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#2c2c2e] mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8} maxLength={16}
                        className="w-full p-3 pl-10 pr-10 rounded-lg border border-[#3a3a3c] focus:outline-none focus:ring-2 focus:ring-[#4a6cf7] focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <i className="ri-lock-line absolute text-[#a1a1a3] transform -translate-y-1/2 left-3 top-1/2 text-lg"></i>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-[#a1a1a3] transform -translate-y-1/2 right-3 top-1/2"
                      >
                        {showPassword ? (
                          <i className="text-lg ri-eye-off-line"></i>
                        ) : (
                          <i className="text-lg ri-eye-line"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-[#4a6cf7] rounded cursor-pointer border-[#3a3a3c] focus:ring-[#4a6cf7]"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-[#1c1c1e]"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-[#4a6cf7] hover:text-[#4a6cf7]/80"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#4a6cf7] text-white py-3 cursor-pointer rounded-lg flex items-center justify-center hover:bg-[#4a6cf7]/85 duration-300 transition-colors"
                  >
                    <span>Sign in</span>
                    <i className="ml-2 text-lg ri-arrow-right-line"></i>
                  </button>

                  {/* Alternative Sign In */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#3a3a3c]/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-[#a1a1a3]">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 rounded-lg border border-[#3a3a3c] text-[#1c1c1e] hover:bg-[#f0f0f0] transition duration-300"
                  >
                    <i className="mr-2 text-main-border ri-google-fill"></i>
                    Continue with Google
                  </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-[#a1a1a3]">
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        className="font-medium text-[#4a6cf7] hover:text-[#4a6cf7]/80"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Image/Branding */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#4a6cf7]/10 to-[#f29ca3]/10 p-8 flex-col justify-center items-center">
              <div className="max-w-lg">
                <div className="mb-8 text-center">
                  <div className="inline-block p-2 bg-[#4a6cf7]/10 rounded-full mb-4">
                    <i className="ri-book-open-line text-[#4a6cf7] text-2xl"></i>
                  </div>
                  <h2 className="text-3xl font-bold text-[#1c1c1e] mb-2">
                    Track, Rate & Reflect
                  </h2>
                  <p className="text-[#a1a1a3] mb-6">
                    Your personal digital library that evolves with your reading
                    journey.
                  </p>
                </div>

                {/* Book showcase */}
                <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
                  <h3 className="text-lg font-medium text-[#1c1c1e] mb-4">
                    Recently in ReadnRate
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-16 rounded bg-gradient-to-br from-[#4a6cf7] to-[#f29ca3] flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-[#1c1c1e]">
                            Book Title {index}
                          </h4>
                          <p className="text-sm text-[#a1a1a3]">Author Name</p>
                        </div>
                        <div className="flex items-center ml-auto">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`ri-star-fill text-sm ${
                                i < 4 ? "text-[#4a6cf7]" : "text-[#a1a1a3]"
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#a1a1a3] text-sm">
                    Join thousands of readers who track their reading journey
                    with ReadnRate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
