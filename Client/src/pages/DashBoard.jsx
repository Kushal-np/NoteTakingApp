import React from "react";
import SideBar from "../components/SideBar";

const DashBoard = () => {
  return (
    <div className="h-[100vh] w-full bg-stone-50 flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="w-[80%] flex justify-center items-center bg-stone-25">
        <div className="w-[90%] h-[90%] bg-white/60 backdrop-blur-sm 
                        shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-stone-200/40">
          <div className="p-12 h-full flex flex-col justify-center">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-7xl font-extralight text-stone-900 tracking-[0.02em] leading-none">
                Welcome
              </h1>
              <div className="w-16 h-px bg-stone-900 mt-6"></div>
            </div>

            {/* User Info */}
            <div className="mt-12">
              <div className="text-stone-600 text-lg font-light tracking-wide">
                <p className="text-sm uppercase tracking-[0.2em] text-stone-400 mb-2">
                  Name
                </p>
                <p className="text-2xl font-extralight text-stone-800 tracking-wide">
                  User Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
