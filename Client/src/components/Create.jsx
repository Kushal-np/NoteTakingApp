import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../services/api";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in");
        setLoading(false);
        return;
      }

      const res = await api.post(
        "/note/create-note",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setSuccess("Note created successfully!");
        setTitle("");
        setContent("");
      } else {
        setError(res.data.message || "Failed to create note");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the note");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <SideBar />

      <div className="flex-1 flex flex-col max-h-screen">
        
        <div className="border-b border-white p-6 sm:p-8 bg-black flex-shrink-0 shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
          <h1 className="text-3xl font-extrabold text-center tracking-tight">
            Create A New Note
          </h1>
        </div>

        <div className="flex-1 p-4 md:p-8 bg-black overflow-y-auto hide-scrollbar">
          <div className="max-w-4xl mx-auto">
            
            <form
              onSubmit={handleSubmit}
              className="bg-black border border-white/50 rounded-xl p-8 shadow-[0_4px_12px_rgba(255,255,255,0.1)] space-y-6"
            >
              {error && <p className="p-3 bg-black border-2 border-white text-white rounded-lg font-medium">{error}</p>}
              {success && <p className="p-3 bg-black border-2 border-white text-white rounded-lg font-medium">{success}</p>}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Note Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-white/50 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ease-in-out disabled:opacity-50"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Note Content
                </label>
                <textarea
                  rows="8"
                  className="w-full px-4 py-3 border border-white/50 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[150px] transition-colors duration-300 ease-in-out disabled:opacity-50"
                  placeholder="Write your note content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 ease-in-out shadow-[0_4px_12px_rgba(255,255,255,0.2)] disabled:bg-white/20 disabled:text-white/50 disabled:shadow-none"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors duration-300 ease-in-out disabled:opacity-50"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;