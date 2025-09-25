import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);
    try {
      const res = await api.post("/auth/signup", { username, email, password });
      localStorage.setItem("token", res.data.token); // if backend sends token
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-25 flex items-center justify-center px-6">
      <div className="w-full max-w-xs">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extralight text-stone-900 tracking-[0.2em] uppercase">
            Sign Up
          </h2>
          <div className="w-6 h-px bg-stone-900 mx-auto mt-6"></div>
        </div>

        {/* Form container */}
        <div className="bg-white/80 backdrop-blur-sm border-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)] px-0 py-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Username */}
            <div className="group relative">
              <input
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-0 py-4 border-0 border-b border-stone-200/60 bg-transparent text-stone-900 text-sm tracking-wide placeholder-transparent focus:outline-none focus:border-stone-400 transition-all duration-300 peer"
                id="username"
              />
              <label
                htmlFor="username"
                className="absolute left-0 -top-2 text-stone-500 text-xs font-light tracking-widest uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-xs peer-focus:text-stone-600 peer-focus:uppercase peer-focus:tracking-widest"
              >
                Username
              </label>
            </div>

            {/* Email */}
            <div className="group relative">
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-4 border-0 border-b border-stone-200/60 bg-transparent text-stone-900 text-sm tracking-wide placeholder-transparent focus:outline-none focus:border-stone-400 transition-all duration-300 peer"
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-2 text-stone-500 text-xs font-light tracking-widest uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-xs peer-focus:text-stone-600 peer-focus:uppercase peer-focus:tracking-widest"
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="group relative">
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 border-0 border-b border-stone-200/60 bg-transparent text-stone-900 text-sm tracking-wide placeholder-transparent focus:outline-none focus:border-stone-400 transition-all duration-300 peer"
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-2 text-stone-500 text-xs font-light tracking-widest uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-xs peer-focus:text-stone-600 peer-focus:uppercase peer-focus:tracking-widest"
              >
                Password
              </label>
            </div>

            {/* Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 text-white py-4 px-0 text-sm font-light tracking-[0.15em] uppercase hover:bg-stone-800 disabled:bg-stone-300 transition-all duration-300 hover:tracking-[0.2em] active:scale-[0.98] border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin"></div>
                    <span className="tracking-[0.2em]">Loading...</span>
                  </div>
                ) : (
                  <div className="tracking-[0.15em]">Register</div>
                )}
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-8 pt-6 border-t border-stone-100/80">
              <p className="text-red-400 text-xs text-center font-light tracking-wide uppercase">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-stone-400 text-xs tracking-wide">
            <span className="hover:text-stone-600 cursor-pointer transition-colors duration-300 border-b border-transparent hover:border-stone-300">
              Already have an account?
            </span>
          </p>
          <div className="flex items-center justify-center space-x-1 text-xs text-stone-400 tracking-wide">
            <span>Go back to</span>
            <span className="text-stone-700 hover:text-stone-900 cursor-pointer transition-colors duration-300 font-normal">
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
