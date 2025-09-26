import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white antialiased">
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/20 bg-gradient-to-b from-black via-black/90 to-black sticky top-0 backdrop-blur-sm z-10 shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
        <h1 className="text-2xl font-extrabold text-white">NoteKeeper</h1>
        <div className="space-x-3 sm:space-x-5">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium text-white/80 rounded-lg hover:text-blue-400 transition-colors duration-300"
          >
            Log in
          </button>

        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        <h2 className="text-5xl md:text-6xl font-black max-w-4xl tracking-tight leading-snug">
          Capture Ideas. <span className="text-blue-500">Organize Life.</span> <br className="hidden sm:inline" /> Instantly.
        </h2>


        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
          
          <Link to="/signup">
          <button
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Start Taking Notes (It's Free)
          </button></Link>
          <Link to="/login">
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-8 py-3 border border-white/30 text-white/80 text-lg font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300"
          >
            Log In
          </button></Link>
        </div>
      </main>

      <footer className="text-center py-6 border-t border-white/20 bg-black text-white/50 text-base">
        <p className="max-w-4xl mx-auto">
         Made with love by <a href="https://x.com/Kushalpoudel_" className="text-blue-500">Kushal</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;