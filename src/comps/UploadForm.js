import React,{useState} from 'react'
import Progressbar from './Progressbar'

import {auth} from "../firebase/config"

const signout = () => auth.signOut();

const UploadForm = () => {
    const [file, setfile] = useState(null)
    const [error, seterror] = useState(null)

    const types = ["image/png", "image/jpeg", "image/jpg"]

    const changehandler = (event) => {
        const selected= event.target.files[0]
        if (selected && types.includes(selected.type)){
        console.log(selected)
            setfile(selected)
            seterror("")
        }else{
            setfile(null)
            seterror("Please select image of type (png or jpeg)")
        }
    }
    return (
        <>
        <button onClick={signout}>Sign out</button>
        <form>
            <label>
            <input type="file" onChange ={changehandler} />
            <span>+</span>
            </label>
            <div className="output">
                {error &&  <div className="error">{error}</div>}
                {/* {file &&  <div className="error">{file.name}</div>} */}
                {file &&  <Progressbar file={file} setfile={setfile} auth={auth}/>}
            </div>
        </form>
        </>
    )
}

export default UploadForm