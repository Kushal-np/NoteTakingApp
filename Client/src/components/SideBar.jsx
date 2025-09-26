import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <aside className="w-[20%] flex justify-center items-center bg-gradient-to-b from-neutral-950 via-zinc-900 to-neutral-950 border-r border-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <div className="h-[100vh] w-[90%] flex flex-col justify-between px-2">
        
        {/* Upper section */}
        <div className="flex flex-col gap-5 items-center mt-12">
          {[
            { name: "My Notes", to: "/Notes" },
            { name: "Create", to: "/CreateNotes" },
            { name: "Edits and Controls", to: "/Edit" },
            { name: "Remove", to: "/RemoveNotes" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `w-full py-4 text-sm font-light tracking-[0.1em] uppercase text-center rounded-lg transition-all duration-500 border-0 border-b 
                 ${isActive 
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_4px_12px_rgba(59,130,246,0.2)]" 
                    : "text-zinc-200 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 hover:shadow-[0_4px_12px_rgba(59,130,246,0.1)]"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Lower section */}
        <div className="border-t border-white/20 pt-5 mb-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-red-400 text-xs font-light tracking-[0.15em] uppercase 
                       hover:text-red-300 hover:bg-red-500/10 transition-all duration-500 border-0 bg-transparent rounded-lg shadow-[0_4px_12px_rgba(239,68,68,0.1)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;