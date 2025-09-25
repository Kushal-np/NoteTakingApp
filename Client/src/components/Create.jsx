import React from 'react'
import SideBar from './SideBar'

const Create = () => {
  return (
    <div className="h-screen flex bg-white">
      <SideBar />
      
      <div className="flex-1 flex flex-col **max-h-screen**"> 
        
        <div className="border-b border-gray-200 p-6 bg-white **flex-shrink-0**">
          <h1 className="text-3xl font-bold text-black text-center">
            Create A New Note
          </h1>
        </div>


        <div className="flex-1 **p-4 md:p-8** bg-gray-50 **overflow-y-auto**">
          <div className="max-w-4xl mx-auto">
            <form className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="space-y-6">
                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note Title
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Enter note title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note Content
                  </label>
                  <textarea 
                    rows="8" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-y min-h-[150px]" // Changed resize-vertical to resize-y
                    placeholder="Write your note content here..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Enter category (optional)..."
                  />
                </div>

                <div className="flex **flex-col sm:flex-row** gap-4 pt-4">
                  <button 
                    type="submit"
                    className="**w-full sm:w-auto** px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Create Note
                  </button>
                  <button 
                    type="button"
                    className="**w-full sm:w-auto** px-8 py-3 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create