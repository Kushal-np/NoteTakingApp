import React from 'react'
import SideBar from './SideBar'

const Notes = () => {
  return (
    <div className="h-screen flex bg-white text-black">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-white">
          <h1 className="text-3xl font-bold text-black">
            User's Notes
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Organize your thoughts</p>
        </div>

        {/* Sort + Actions */}
        <div className="p-6 flex justify-between items-center border-b border-gray-200 bg-white">
          <div className="text-gray-600 text-sm">Sort by: Date | Title</div>
          <button className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            + Create Note
          </button>
        </div>

        {/* Notes List */}
        <div className="p-6 grid gap-4">
          <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div className="p-6 flex justify-between items-center">
              <div>
                <div className="text-xl font-semibold mb-2 text-black">
                  Note Title
                </div>
                <p className="text-gray-600 text-sm">Sample note preview text goes here...</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-black text-sm hover:bg-gray-200 transition-colors">
                  View
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-black text-sm hover:bg-gray-200 transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-black text-sm hover:bg-gray-200 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State / Create CTA */}
        <div className="flex flex-col justify-center items-center flex-1 text-center">
          <div className="mb-6 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">📝</div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-black">
            No notes yet?
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm">
            Start capturing your ideas and thoughts in notes.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Create your first note
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notes