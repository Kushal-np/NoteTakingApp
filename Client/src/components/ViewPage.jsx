import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import SideBar from "./SideBar";

const ViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
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
        const foundNote = res.data.find((n) => n._id === id);
        if (!foundNote) {
          setError("Note not found");
        } else {
          setNote(foundNote);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white/70 text-xl font-medium">
      Loading...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-red-400 text-xl font-medium">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-black text-white">
      <SideBar />

      <div className="flex-1 flex flex-col max-h-screen">
        <div className="border-b border-white/60 p-4 sm:p-5 bg-gradient-to-b from-black via-black/90 to-black flex-shrink-0 shadow-[0_6px_18px_rgba(255,255,255,0.15)] z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-normal leading-snug">
              View Note
            </h1>
          </div>
        </div>

        <div className="flex-1 p-3 sm:p-4 bg-black overflow-y-auto hide-scrollbar">
          <div className="max-w-3xl mx-auto bg-black/90 border border-white/50 rounded-lg p-5 sm:p-6 shadow-[0_6px_18px_rgba(255,255,255,0.1)]">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {note.title}
            </h2>

            <p className="text-white/80 text-lg whitespace-pre-wrap leading-relaxed border-t border-white/30 pt-5 mt-5">
              {note.content}
            </p>

            
            <button 
              onClick={() => navigate("/notes")}
              className="mt-6 px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 ease-in-out shadow-[0_4px_12px_rgba(255,255,255,0.2)]"
            >
              Back to Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;