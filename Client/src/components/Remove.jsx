import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import api from "../services/api";

const Remove = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    setSelectedNotes([]);
    setSelectAll(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must log in first");

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
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const toggleSelect = (id) => {
    setSelectedNotes((prev) => {
      const newSelected = prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id];
      setSelectAll(newSelected.length === notes.length);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotes([]);
      setSelectAll(false);
    } else {
      setSelectedNotes(notes.map((note) => note._id));
      setSelectAll(true);
    }
  };

  const handleDelete = async () => {
    if (selectedNotes.length === 0) return;

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must log in");

      const res = await api.delete("/note/delete-note", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids: selectedNotes },
      });

      setNotes((prev) => prev.filter((note) => !selectedNotes.includes(note._id)));
      setSelectedNotes([]);
      setSelectAll(false);
      setSuccess(res.data.message || "Selected notes deleted");
      setTimeout(() => setSuccess(""), 3000);
      await fetchNotes();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error deleting notes");
      setTimeout(() => setError(""), 3000);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <SideBar />

      <div className="flex-1 flex flex-col w-full max-h-screen">
        
        <div className="p-6 sm:p-8 border-b border-white bg-black text-white flex-shrink-0 shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
          <h1 className="text-3xl font-extrabold text-center tracking-tight">
            Delete Your Notes
          </h1>
        </div>

        <div className="flex-1 p-4 md:p-8 bg-black overflow-y-auto hide-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {loading && <div className="p-4 text-center text-white bg-black border border-white rounded-lg shadow-md">Loading notes...</div>}
            {error && <div className="p-4 text-center text-white bg-black border-2 border-white rounded-lg font-medium">{error}</div>}
            {success && <div className="p-4 text-center text-white bg-black border-2 border-white rounded-lg font-medium">{success}</div>}

            {/* Separate Select All Region: Rounded, distinct with margins */}
            {notes.length > 0 && (
              <div className="p-4 flex items-center bg-black border border-white/50 rounded-full shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-colors cursor-pointer mb-6" onClick={handleSelectAll}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-6 w-6 text-white border-white rounded-lg focus:ring-white mr-4 cursor-pointer"
                />
                <div className="flex-1 text-xl font-bold text-white">Select All</div>
              </div>
            )}

            <div className={`bg-black border ${notes.length > 0 ? 'border-white' : 'border-dashed border-white'} rounded-xl shadow-[0_4px_12px_rgba(255,255,255,0.1)] divide-y divide-white`}>
              
              {!loading && notes.length === 0 && (
                <div className="p-6 text-center text-white font-medium">No notes available.</div>
              )}

              {notes.map((note) => (
<div
  key={note._id}
  onClick={() => toggleSelect(note._id)}
  className={`group flex items-center p-5 sm:p-6 rounded-xl border transition-all duration-300 ease-in-out cursor-pointer shadow-sm
    ${
      selectedNotes.includes(note._id)
        ? "bg-red-600 border-red-700 text-white shadow-md"
        : "bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-lg"
    }`}
>
  {/* Checkbox */}
<input
  type="checkbox"
  checked={selectedNotes.includes(note._id)}
  onChange={() => toggleSelect(note._id)}
  className="form-checkbox h-6 w-6 text-red-700 border-gray-900 rounded-full focus:ring-red-500 mr-4 cursor-pointer transition-colors"
/>

  {/* Note Title */}
  <div className="flex-1">
    <h2
      className={`text-lg sm:text-xl font-semibold truncate transition-colors duration-200
        ${
          selectedNotes.includes(note._id)
            ? "text-white"
            : "text-gray-200 group-hover:text-white"
        }`}
    >
      {note.title}
    </h2>
  </div>
</div>

              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleDelete}
                disabled={selectedNotes.length === 0 || deleting}
                className={`px-10 py-3 text-lg font-semibold rounded-xl transition-all shadow-[0_4px_12px_rgba(255,255,255,0.2)] 
                ${selectedNotes.length === 0 || deleting 
                  ? "bg-white/20 text-white/50 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-white/90 hover:shadow-[0_6px_16px_rgba(255,255,255,0.3)]"
                }`}
              >
                {deleting 
                  ? "Deleting..." 
                  : `Delete ${selectedNotes.length > 0 ? `(${selectedNotes.length})` : ''} Note${selectedNotes.length !== 1 ? 's' : ''}`
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remove;