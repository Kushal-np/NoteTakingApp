import React from 'react'
import SideBar from './SideBar'

const Edit = () => {
  return (
    <div>
        <div>
            <SideBar/>
        </div>

        <div>
            <div>
                {/* The edits and controls section  */}
                <div> </div>
                {/* List and notes section  */}
                <div>
                    {/* title of the section  */}
                    <div>

                    </div>
                    {/* actual lists will be shown here  */}
                    <div>

                    </div>
                    {/* see more button  */}
                    <div>
                        <button>Submit</button>
                    </div>
                </div>
                {/* actual editing section  */}
                <div>
                    <div>
                        {/* Enter title section  */}
                        <div></div>
                        {/* text editor  */}
                        <div></div>
                        {/* tags section  */}
                        <div></div>
                        <div>
                            <button>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Edit ;