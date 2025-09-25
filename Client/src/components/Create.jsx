import React from 'react'
import SideBar from './SideBar'

const Create = () => {
  return (
    <div  className='max-h-[100vh] flex'>
            <SideBar />
        <div>
            <div>Create A New Note</div>
            <div>
                <button>
                    Create
                </button>
            </div>
            <div>
                <div>
                    <form action="">
                        <div>
                        <div>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="text" />
                        </div>
                        </div>
                        <div>
                            <button>
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create