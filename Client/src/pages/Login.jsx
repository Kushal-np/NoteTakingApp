import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/auth/login", { username, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light text-white tracking-wide uppercase">Login</h2>
          <div className="w-6 h-px bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm shadow-[0_8px_24px_rgba(255,255,255,0.1)] rounded-lg px-6 py-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-0 py-3 border-0 border-b border-white/30 bg-transparent text-lg text-white placeholder-transparent focus:outline-none focus:border-blue-500 peer"
                placeholder="Username"
              />
              <label
                htmlFor="username"
                className="absolute left-0 -top-2 text-white/70 text-sm tracking-wider transition-all duration-300
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/50
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Username
              </label>
            </div>

            <div className="group relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-0 py-3 border-0 border-b border-white/30 bg-transparent text-lg text-white placeholder-transparent focus:outline-none focus:border-blue-500 peer"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-2 text-white/70 text-sm tracking-wider transition-all duration-300
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/50
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500/20 text-white py-3 text-lg font-medium tracking-widest uppercase
                hover:bg-blue-500 disabled:bg-white/10 transition-all duration-300 rounded-md
                flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_18px_rgba(59,130,246,0.3)]"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 text-center">
              <p className="text-red-500 text-sm font-light">{error}</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-white/50">
            <span className="hover:text-blue-400 cursor-pointer">Forgot password?</span>
          </p>
          <p className="mt-2 text-xs text-white/50">
            New here?{" "}
            <Link to="/signup">
            <span className="text-blue-400 font-medium hover:underline cursor-pointer" onClick={() => navigate("/register")}>
              Create account
            </span>
</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login