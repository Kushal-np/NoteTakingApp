import React from "react";

const SideBar = () => {
  return (
    <aside className="w-[20%] flex justify-center items-center bg-white/80 backdrop-blur-sm border-r border-stone-200/60">
      <div className="h-[90%] w-[90%] flex flex-col justify-between">
        {/* Upper section */}
        <div className="flex flex-col gap-6 items-center mt-10">
          {["My Notes", "Create", "Edits and controls", "Remove"].map(
            (item, index) => (
              <button
                key={index}
                className="w-full py-4 text-stone-700 text-sm font-light tracking-[0.1em] uppercase 
                           hover:text-stone-900 hover:bg-stone-100/60 transition-all duration-300 
                           border-0 border-b border-transparent hover:border-stone-300 bg-transparent"
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Lower section */}
        <div className="border-t border-stone-200/60 pt-6">
          <button
            className="w-full py-3 text-stone-500 text-xs font-light tracking-[0.15em] uppercase 
                       hover:text-red-600 hover:bg-red-50/60 transition-all duration-300 border-0 bg-transparent"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
