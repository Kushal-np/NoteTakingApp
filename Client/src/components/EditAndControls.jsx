import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Edit = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [success, setSuccess] = useState(false);

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
        // Handle various response structures
        const notesData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.notes)
          ? res.data.notes
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setNotes(notesData);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSelect = (note) => {
    setSelectedNoteId(note._id);
    setTitle(note.title || "");
    setContent(note.content || "");
    setTags(note.tags ? note.tags.join(", ") : "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedNoteId) return;

    const token = localStorage.getItem("token");
    try {
      const res = await api.put(
        `/note/update-note/${selectedNoteId}`,
        {
          title,
          content,
          tags: tags.split(",").map(t => t.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedNote = {
        ...notes.find(note => note._id === selectedNoteId),
        title,
        content,
        tags: tags.split(",").map(t => t.trim()),
        updatedAt: new Date().toISOString()
      };

      const newNotes = notes.map(note =>
        note._id === selectedNoteId ? updatedNote : note
      );
      
      setNotes(newNotes);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Error updating note: " + (err.message || "Unknown error"));
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <SideBar />
      
      <div className="flex-1 flex flex-col w-full max-h-screen">
        <div className="p-6 sm:p-8 border-b border-white bg-black text-white flex-shrink-0 shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
          <h1 className="text-3xl font-extrabold text-center tracking-tight">
            Edit Your Notes
          </h1>
        </div>

        <div className="flex-1 p-4 md:p-8 bg-black overflow-y-auto hide-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <h2 className="text-2xl font-bold text-white pt-4 border-t border-white/50">
              Edit Note: <span className="text-green-500">{selectedNoteId ? title : 'Select a Note Below'}</span>
            </h2>

            <form 
              className="bg-black border border-white/50 rounded-xl p-6 sm:p-8 shadow-[0_4px_12px_rgba(255,255,255,0.1)] space-y-6" 
              onSubmit={handleUpdate}
            >
              <div>
                <label className="block text-sm font-medium text-white mb-2">Note Title</label>
                <input
                  type="text"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-white/50 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors disabled:opacity-50"
                  disabled={!selectedNoteId}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Note Content</label>
                <textarea
                  rows="6"
                  placeholder="Enter the body"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-white/50 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y min-h-[150px] transition-colors disabled:opacity-50"
                  disabled={!selectedNoteId}
                ></textarea>
              </div>



              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-[0_4px_12px_rgba(255,255,255,0.2)] disabled:bg-white/20 disabled:text-white/50 disabled:shadow-none"
                  disabled={!selectedNoteId}
                >
                  Update Note
                </button>
              </div>
            </form>

            <div className="flex-1 p-4 md:p-6 bg-black -mx-4 -mb-8">
              {loading && <p className="text-white text-center border border-white rounded-lg p-3">Loading notes...</p>}
              {error && <p className="text-white text-center p-3 bg-black border-2 border-white rounded-lg">{error}</p>}
              {success && <p className="text-green-300 text-center p-3 bg-black border-2 border-white rounded-lg mb-4">Updated successfully! </p>}
              
              {!loading && !error && notes.length === 0 && (
                <p className="text-white text-center mt-6 p-4 bg-black border border-white rounded-lg">No notes available for editing.</p>
              )}

              <div className="grid gap-4 mt-4">
                {notes.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((note) => (
                  <div
                    key={note._id}
                    className={`bg-black border-2 rounded-xl shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-4 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out 
                    ${selectedNoteId === note._id ? "border-green-500 bg-green-900 shadow-lg ring-2 ring-red-500/50" : "border-white/50 hover:border-white/70 hover:bg-white/10"}`}
                    onClick={() => handleSelect(note)}
                  >
                    <div className="text-xl font-bold text-white truncate">{note.title}</div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;