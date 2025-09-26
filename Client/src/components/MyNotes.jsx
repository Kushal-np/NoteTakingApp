import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must log in first");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/note/read-note", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const notesData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.notes)
          ? res.data.notes
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setNotes(notesData);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  

  return (
    <div className="min-h-screen flex bg-black text-white">
      <SideBar />

      <div className="flex-1 flex flex-col max-h-screen">
        <div className="border-b border-white/60 p-5 sm:p-6 bg-gradient-to-b from-black via-black/90 to-black flex-shrink-0 shadow-[0_6px_18px_rgba(255,255,255,0.15)] z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-normal leading-snug">
              <span
                className="text-blue-500 hover:text-blue-400 transition-colors duration-300 ease-in-out cursor-default"
              >
                {(() => {
                  const name = user?.username || user?.email?.split('@')[0] || "User";
                  const specialNames = [
                    "anjala",
                    "anjala bhandari",
                    "Anjala",
                    "Anjala Bhandari"
                  ];
                  if (specialNames.includes(name.toLowerCase())) {
                    return "Hottie";
                  }
                  return name;
                })()}
              </span>'s Notes
            </h1>
            <p className="text-white/80 mt-2 text-sm sm:text-base font-medium italic">
            </p>
          </div>
        </div>

        <div className="flex-1 p-3 sm:p-4 bg-black overflow-y-auto hide-scrollbar">
          {loading && <p className="text-white/70 text-center mt-8 border border-white/50 rounded-lg p-3 shadow-[0_3px_9px_rgba(255,255,255,0.1)]">Loading notes...</p>}
          {error && <p className="text-white text-center mt-8 p-3 bg-black border-2 border-white rounded-lg shadow-[0_3px_9px_rgba(255,255,255,0.1)]">{error}</p>}
          
          <div className="grid gap-3 max-w-3xl mx-auto">
            {notes.length > 0 ? (
              notes.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((note) => (
                <div
                  key={note._id}
                  className="bg-black border border-white/50 rounded-lg shadow-[0_3px_9px_rgba(255,255,255,0.1)] hover:shadow-md transition-all duration-300 ease-in-out"
                >
                  <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0 sm:mr-3 flex-1 min-w-0">
                      <div className="text-lg font-semibold mb-1 text-white truncate">
                        {note.title}
                      </div>
                    </div>
                    <div className="flex gap-2 sm:gap-2 flex-wrap">
                      <button 
                        onClick={() => { navigate(`/note/${note._id}`) }} 
                        className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-blue-500/20 text-blue-500 text-xs font-medium hover:bg-blue-500/30 transition-colors duration-300 ease-in-out flex-shrink-0"
                      >
                        View
                      </button>

                    </div>
                  </div>
                </div>
              ))
            ) : !loading && !error ? (
              <div className="flex flex-col justify-center items-center p-8 text-center bg-black border-t border-white/50 flex-shrink-0">

                <h3 className="text-xl font-bold mb-2 text-white">No notes yet?</h3>
                <p className="text-white/70 mb-4 max-w-xs sm:max-w-sm text-sm">
                </p>
                <button
                  onClick={() => navigate("/CreateNotes")}
                  className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 ease-in-out shadow-[0_3px_9px_rgba(255,255,255,0.2)]"
                >
                  Create your first note
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;