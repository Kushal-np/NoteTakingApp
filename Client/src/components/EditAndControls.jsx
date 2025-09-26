import React, { useEffect, useState, useMemo } from 'react';
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

  // Force re-render trigger
  const [updateTrigger, setUpdateTrigger] = useState(0);

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
        setNotes(res.data);
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Select a note from the list
  const handleSelect = (note) => {
    setSelectedNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags ? note.tags.join(", ") : "");
  };

  // Update the note live
  const handleUpdate = async (e) => {
  e.preventDefault();
  if (!selectedNoteId) return;

  const token = localStorage.getItem("token");
  try {
    // Call API
    const res = await api.put(
      `/note/update-note/${selectedNoteId}`,
      {
        title,
        content,
        tags: tags.split(",").map(t => t.trim()),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("API Response:", res.data); // DEBUG LINE

    // Always update state regardless of API response structure
    const updatedNote = {
      ...notes.find(note => note._id === selectedNoteId),
      title,
      content,
      tags: tags.split(",").map(t => t.trim()),
      updatedAt: new Date().toISOString()
    };

    console.log("Updated Note:", updatedNote); // DEBUG LINE

    // Update notes array immutably
    const newNotes = notes.map(note =>
      note._id === selectedNoteId ? updatedNote : note
    );
    
    console.log("New Notes Array:", newNotes); // DEBUG LINE
    setNotes(newNotes);

    // Force component re-render
    setUpdateTrigger(prev => prev + 1);

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

  } catch (err) {
    console.error(err);
    alert("Error updating note: " + err.message);
  }
};


  return (
    <div className='min-h-screen flex bg-white'>
      <SideBar />
      <div className='flex-1 flex flex-col w-full max-h-screen'>
        <div className='p-4 sm:p-6 border-b border-gray-200 bg-white text-black flex-shrink-0 shadow-sm'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center'>
            Edits and Controls
          </h1>
        </div>

        {/* Edit Form */}
        <div className='flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto hide-scrollbar'>
          <div className='max-w-4xl mx-auto space-y-8'>
            <h2 className='text-2xl font-bold text-gray-800 pt-4 border-t border-gray-300'>Edit Post:</h2>

            <form className='bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-md space-y-6' onSubmit={handleUpdate}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Note Title</label>
                <input
                  type="text"
                  placeholder='Enter the title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Note Content</label>
                <textarea
                  rows="6"
                  placeholder='Enter the body'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-y min-h-[150px]'
                ></textarea>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Tags (Optional)</label>
                <input
                  type="text"
                  placeholder='Tags (comma separated)'
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
                />
              </div>

              <div className='pt-2'>
                <button
                  type="submit"
                  className='w-full sm:w-auto px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors'
                  disabled={!selectedNoteId}
                >
                  Update Note
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
              {loading && <p className="text-gray-600 text-center">Loading notes...</p>}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className='text-green-600 text-center mb-2'>Updated successfully!</p>}
              {!loading && !error && notes.length === 0 && (
                <p className="text-gray-600 text-center mt-6">No notes available</p>
              )}

              <div className="grid gap-4 mt-4">
                {notes.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)).map((note) => (
                  <div
                    key={note._id}
                    className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer 
                    ${selectedNoteId === note._id ? "border-black" : "hover:border-gray-400"} transition-colors`}
                    onClick={() => handleSelect(note)}
                  >
                    <div className="text-lg font-semibold">{note.title}</div>
                    <p className="text-gray-600 text-sm truncate">{note.content}</p>
                    <p className="text-gray-600 text-sm">{note.tags && note.tags.length > 0 ? note.tags.join(", ") : ""}</p>
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