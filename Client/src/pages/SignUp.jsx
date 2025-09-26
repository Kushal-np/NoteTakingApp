import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", { username, email, password });
      localStorage.setItem("token", res.data.token); // if backend sends token
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-xs">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-extralight text-white tracking-[0.2em] uppercase">Sign Up</h2>
          <div className="w-6 h-px bg-blue-500 mx-auto mt-6"></div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm shadow-[0_8px_24px_rgba(255,255,255,0.1)] rounded-lg px-6 py-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group relative">
              <input
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-0 py-4 border-0 border-b border-white/30 bg-transparent text-lg text-white tracking-wide placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300 peer"
                id="username"
              />
              <label
                htmlFor="username"
                className="absolute left-0 -top-2 text-white/70 text-sm font-light tracking-widest uppercase transition-all duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest"
              >
                Username
              </label>
            </div>

            <div className="group relative">
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-4 border-0 border-b border-white/30 bg-transparent text-lg text-white tracking-wide placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300 peer"
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-2 text-white/70 text-sm font-light tracking-widest uppercase transition-all duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest"
              >
                Email
              </label>
            </div>

            <div className="group relative">
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 border-0 border-b border-white/30 bg-transparent text-lg text-white tracking-wide placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300 peer"
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-2 text-white/70 text-sm font-light tracking-widest uppercase transition-all duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest"
              >
                Password
              </label>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500/20 text-white py-4 px-0 text-lg font-light tracking-[0.15em] uppercase hover:bg-blue-500 disabled:bg-white/10 transition-all duration-300 hover:tracking-[0.2em] active:scale-[0.98] border-0 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_18px_rgba(59,130,246,0.3)]"
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

          {error && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-red-400 text-xs text-center font-light tracking-wide uppercase">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-white/50 text-xs tracking-wide">
            <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300 border-b border-transparent hover:border-blue-300">
              Already have an account?
            </span>
          </p>
          <div className="flex items-center justify-center space-x-1 text-xs text-white/50 tracking-wide">
            <span>Go back to</span>
            <Link to="/login">
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-300 font-normal">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;