import React from 'react'
import SideBar from './SideBar'

const Remove = () => {
  return (
    // Outer Container: min-h-screen for full height, flex for side-by-side layout
    <div className='min-h-screen flex bg-white text-black'>
        
        {/* Sidebar: Assumed to be styled and responsive by its own component */}
        <SideBar />
        
        {/* Main Content Column: Takes remaining width, ensures no outer scroll */}
        <div className='flex-1 flex flex-col w-full max-h-screen'>
            
            {/* Header: Fixed height, consistent styling */}
            <div className='p-4 sm:p-6 border-b border-gray-200 bg-white text-black flex-shrink-0 shadow-sm'>
                <h1 className='text-2xl sm:text-3xl font-bold text-center'>
                    Delete your Notes
                </h1>
            </div>

            {/* Main Scrollable Area: All content below the header goes here. 
                flex-1 takes remaining vertical space, overflow-y-auto for internal scrolling. */}
            <div className='flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto hide-scrollbar'> {/* Added hide-scrollbar here */}
                
                {/* Content Wrapper for max-width centering */}
                <div className='max-w-4xl mx-auto space-y-6'>
                    
                    {/* List Header (List of all your Notes + Sort) */}
                    <div className='flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200'>
                        <div className='text-lg font-semibold text-gray-800 mb-2 sm:mb-0'>
                            List of all your Notes 
                        </div>
                        <div className='text-sm text-gray-600 px-3 py-1 bg-white rounded-md border border-gray-300 shadow-sm'>
                            Sort <span className='ml-1'>☰</span> {/* Added a consistent sort icon */}
                        </div>
                    </div>
                    
                    {/* Notes List Container (where individual notes with checkboxes will go) */}
                    <div className='bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200'>
                        
                        {/* Individual Note Item with Checkbox (based on your structure) */}
                        <div className='p-4 sm:p-6 flex items-center bg-white hover:bg-gray-50 transition-colors'>
                            <div className='flex-shrink-0 mr-4'> {/* Checkbox wrapper */}
                                <input 
                                    type="checkbox" 
                                    className='form-checkbox h-5 w-5 text-red-600 rounded border-gray-300 focus:ring-red-500' // Styled checkbox
                                />
                            </div>
                            <div className='flex-1 text-lg font-medium text-gray-800 truncate'> {/* Title */}
                                Note Title Example (Select to Delete)
                            </div>
                        </div>

                        {/* Duplicated for demonstration as per image, you'd map over actual data */}
                        <div className='p-4 sm:p-6 flex items-center bg-white hover:bg-gray-50 transition-colors'>
                            <div className='flex-shrink-0 mr-4'>
                                <input 
                                    type="checkbox" 
                                    className='form-checkbox h-5 w-5 text-red-600 rounded border-gray-300 focus:ring-red-500'
                                />
                            </div>
                            <div className='flex-1 text-lg font-medium text-gray-800 truncate'>
                                Another Note Title to Delete
                            </div>
                        </div>
                    </div>
                    
                    {/* "Delete All" Button */}
                    <div className='flex justify-center pt-4'>
                        <button className='px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg'>
                            Delete Selected Notes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Remove;