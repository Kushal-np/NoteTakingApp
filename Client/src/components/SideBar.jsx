import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="w-[20%] flex justify-center items-center bg-gradient-to-b from-neutral-950 via-zinc-900 to-neutral-950 border-r border-white/10 backdrop-blur-sm shadow-lg shadow-black/40">
      <div className="h-[90%] w-[90%] flex flex-col justify-between">
        
        {/* Upper section */}
        <div className="flex flex-col gap-6 items-center mt-10">
          <Link to="/" className="w-full">
            <div
              className="w-full py-4 text-zinc-200 text-sm font-light tracking-[0.1em] uppercase 
                         hover:text-white hover:bg-white/10 transition-all duration-300 
                         border-0 border-b border-transparent hover:border-white/20 bg-transparent text-center rounded-lg"
            >
              My Notes
            </div>
          </Link>

          <Link to="/CreateNotes" className="w-full">
            <div
              className="w-full py-4 text-zinc-200 text-sm font-light tracking-[0.1em] uppercase 
                         hover:text-white hover:bg-white/10 transition-all duration-300 
                         border-0 border-b border-transparent hover:border-white/20 bg-transparent text-center rounded-lg"
            >
              Create
            </div>
          </Link>

          <Link to="/Edit" className="w-full">
            <div
              className="w-full py-4 text-zinc-200 text-sm font-light tracking-[0.1em] uppercase 
                         hover:text-white hover:bg-white/10 transition-all duration-300 
                         border-0 border-b border-transparent hover:border-white/20 bg-transparent text-center rounded-lg"
            >
              Edits and Controls
            </div>
          </Link>

          <Link to="/RemoveNotes" className="w-full">
            <div
              className="w-full py-4 text-zinc-200 text-sm font-light tracking-[0.1em] uppercase 
                         hover:text-white hover:bg-white/10 transition-all duration-300 
                         border-0 border-b border-transparent hover:border-white/20 bg-transparent text-center rounded-lg"
            >
              Remove
            </div>
          </Link>
        </div>

        {/* Lower section */}
        <div className="border-t border-white/10 pt-6">
          <button
            className="w-full py-3 text-red-400 text-xs font-light tracking-[0.15em] uppercase 
                       hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 border-0 bg-transparent rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
