import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        console.log(res.data); // check what you get
        setNotes(res.data); // direct array from backend
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="h-screen flex bg-white text-black">
      <SideBar />

      <div className="flex-1 flex flex-col max-h-screen">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 sm:p-6 bg-white flex-shrink-0 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            User's Notes
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Organize your thoughts</p>
        </div>

        {/* Actions Bar */}
        <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-200 bg-white flex-shrink-0">
          <div className="text-gray-600 text-sm">Sort by: Date | Title</div>
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            + Create Note
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
          {loading && <p className="text-gray-600 text-center">Loading notes...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && notes.length === 0 && (
            <p className="text-gray-600 text-center mt-6">No notes available</p>
          )}

          <div className="grid gap-4">
            {notes.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)).map((note) => (
              <div
                key={note._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-400 transition-colors"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-3 sm:mb-0 sm:mr-4 flex-1 min-w-0">
                    <div className="text-lg sm:text-xl font-semibold mb-1 text-black truncate">
                      {note.title}
                    </div>
                    <p className="text-gray-600 text-sm truncate">{note.content}</p>
                    <p>{note.tags && note.tags.length > 0 ? note.tags.join(", ") : ""}</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-100 text-black text-xs sm:text-sm hover:bg-gray-200 transition-colors flex-shrink-0">
                      View
                    </button>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-100 text-black text-xs sm:text-sm hover:bg-gray-200 transition-colors flex-shrink-0">
                      Edit
                    </button>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-100 text-black text-xs sm:text-sm hover:bg-gray-200 transition-colors flex-shrink-0">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {!loading && notes.length === 0 && (
          <div className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-t border-gray-200">
            <div className="mb-6 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="text-3xl sm:text-4xl">📝</div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">No notes yet?</h3>
            <p className="text-gray-600 mb-6 max-w-xs sm:max-w-sm text-sm sm:text-base">
              Start capturing your ideas and thoughts in notes.
            </p>
            <button
              onClick={() => navigate("/create")}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Create your first note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
