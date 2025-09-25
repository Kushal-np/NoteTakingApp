import React from 'react'
import SideBar from './SideBar'

const Notes = () => {
  return (
    <div>
        <div>
        <SideBar/>
        </div>
        <div>
        <div>
            
            <div>User's Notes</div>
            {/* sort by  */}
            <div></div>
        </div>
        <div>
            {/* Lists  */}
            <div>
                <div>
                    <div>Title</div>
                    <div>
                        <div>view</div>
                        <div>edit</div>
                        <div>delete</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            Add new note ? <div>Create</div>
        </div>
        </div>
    </div>
  )
}

export default Notes