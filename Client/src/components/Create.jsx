import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../services/api";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTags] = useState("");
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
        { title, content, tag },
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
        setTags("");
        // Optional: Redirect to My Notes page
        // navigate("/Notes");
      } else {
        setError(res.data.message || "Failed to create note");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while creating the note");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setTags("");
    setError("");
    setSuccess("");
    // Optional: Navigate back
    // navigate("/Notes");
  };

  return (
    <div className="h-screen flex bg-white">
      <SideBar />

      <div className="flex-1 flex flex-col max-h-screen">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-white flex-shrink-0">
          <h1 className="text-3xl font-bold text-black text-center">
            Create A New Note
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-lg p-8 space-y-6"
            >
              {/* Success & Error Messages */}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note Content
                </label>
                <textarea
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-y min-h-[150px]"
                  placeholder="Write your note content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>

              {/* Category Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Enter category (optional)..."
                  value={tag}
                  onChange={(e) => setTags(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-3 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
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
