import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light text-stone-900 tracking-wide uppercase">Login</h2>
          <div className="w-6 h-px bg-stone-900 mx-auto mt-4"></div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="group relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-0 py-3 border-0 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder-transparent focus:outline-none focus:border-stone-600 peer"
                placeholder="Username"
              />
              <label
                htmlFor="username"
                className="absolute left-0 -top-2 text-stone-500 text-xs tracking-wider transition-all duration-300
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-400
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-stone-600"
              >
                Username
              </label>
            </div>

            {/* Password */}
            <div className="group relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-0 py-3 border-0 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder-transparent focus:outline-none focus:border-stone-600 peer"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-2 text-stone-500 text-xs tracking-wider transition-all duration-300
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-stone-400
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-stone-600"
              >
                Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-3 text-sm font-medium tracking-widest uppercase
                hover:bg-stone-800 disabled:bg-stone-300 transition-all duration-300 rounded-md
                flex items-center justify-center"
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

          {/* Error */}
          {error && (
            <div className="mt-6 text-center">
              <p className="text-red-500 text-sm font-light">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-stone-500">
            <span className="hover:underline cursor-pointer">Forgot password?</span>
          </p>
          <p className="mt-2 text-xs text-stone-500">
            New here?{" "}
            <span className="text-stone-900 font-medium hover:underline cursor-pointer">
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
