import React from 'react'
import SideBar from './SideBar'
// You might need to add a custom utility class to your global CSS:
// /* For Webkit (Chrome, Safari) */
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// /* For IE and Edge */
// .hide-scrollbar { -ms-overflow-style: none; }
// /* For Firefox */
// .hide-scrollbar { scrollbar-width: none; }

const Edit = () => {
  return (
    <div className='min-h-screen flex bg-white'>
      
      <SideBar />

      <div className='flex-1 flex flex-col w-full max-h-screen'>
        
        <div className='p-4 sm:p-6 border-b border-gray-200 bg-white text-black flex-shrink-0 shadow-sm'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center'>
            Edits and Controls
          </h1>
        </div>

        <div className='flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto hide-scrollbar'>
            
            <div className='max-w-4xl mx-auto space-y-8'>
                
                <div className='space-y-4'>
                    <div className='py-3 text-lg font-semibold text-center bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm text-gray-800'>
                        List of Your Notes
                    </div>

                    <div className='bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200'>
                        
                        <div className='p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:bg-gray-50 transition-colors'>
                            
                            <div className='mb-3 sm:mb-0 sm:mr-4 flex-1 min-w-0'>
                                <div className='text-lg sm:text-xl font-semibold mb-1 text-gray-800 truncate'>Note Title Example</div>
                                <p className='text-gray-600 text-sm truncate'>This is a preview of the note content...</p> 
                            </div>
                            
                            <div className='flex gap-2 sm:gap-3 flex-wrap'>
                                <button className='px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-100 text-blue-600 text-xs sm:text-sm hover:bg-gray-200 transition-colors font-medium'>
                                    View
                                </button>
                                <button className='px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-100 text-green-600 text-xs sm:text-sm hover:bg-gray-200 transition-colors font-medium'>
                                    Edit
                                </button>
                                <button className='px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-100 text-red-600 text-xs sm:text-sm hover:bg-gray-200 transition-colors font-medium'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center pt-2'>
                        <button className='px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg'>
                            See more
                        </button>
                    </div>
                </div>
                
                <h2 className='text-2xl font-bold text-gray-800 pt-4 border-t border-gray-300'>Edit Post:</h2>
                
                <form className='bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-md space-y-6'>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Note Title</label>
                        <input 
                            type="text" 
                            placeholder='Enter the title' 
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Note Content</label>
                        <textarea
                            rows="6" 
                            placeholder='Enter the body'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-y min-h-[150px]'
                        ></textarea>
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Tags (Optional)</label>
                        <input 
                            type="text" 
                            placeholder='Tags' 
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
                        />
                    </div>
                    
                    <div className='pt-2'>
                        <button
                            type="submit"
                            className='w-full sm:w-auto px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors'
                        >
                            Update Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Edit ;