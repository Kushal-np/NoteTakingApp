import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import api from "../services/api";

const DashBoard = () => {
    const [user, setUser] = useState(null);

    const getDisplayName = () => {
        const name = user?.username || user?.email?.split('@')[0] || "User";

        const specialNames = [
            "anjala",
            "anjala bhandari",
            "Anjala",
            "Anjala Bhandari"
        ];

        if (specialNames.includes(name.toLowerCase())) {
            return "Mayalu";
        }

        return name;
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            try {
                const res = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen flex bg-black text-white w-full">
            <SideBar />

            <main className="flex-1 flex flex-col w-full max-h-screen p-3 sm:p-4 overflow-y-auto hide-scrollbar">
                <div className="flex-1 w-full max-w-4xl mx-auto bg-black/90 rounded-xl shadow-[0_8px_24px_rgba(255,255,255,0.15)]   overflow-hidden">
                    <div className="p-6 sm:p-8 h-full flex flex-col">
                        <div className="mb-8 pt-3 border-b border-white/60 pb-6">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-normal leading-snug">
                                Welcome
                            </h1>
                            <div className="w-12 h-1 bg-blue-500 mt-4 rounded-full"></div>
                        </div>

                        <div className="mt-8 flex-1">
                            <div className="text-white/80 text-lg font-light tracking-wide">
                                <p className="text-sm uppercase tracking-widest text-white/50 mb-4 font-medium">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                                        {getDisplayName()}'s Notes
                                    </h1>
                                </p>
                                <p className="text-xl font-light text-white/70 mt-5 p-5 bg-white/10 border border-white/20 rounded-xl shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:bg-white/15 transition-colors duration-300 ease-in-out">
                                    Your personal workspace is ready.
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