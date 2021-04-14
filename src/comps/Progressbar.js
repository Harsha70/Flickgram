import React,{useEffect} from 'react'
import useStorage from '../customhooks/useStorage'

const Progressbar = ({file, setfile, auth}) => {
    const {url, progress} = useStorage(file, auth)
    console.log(url, progress)

    useEffect(() => {
        url && setfile(null)
    }, [url, setfile])

    return (
        <div className="progress-bar" style={{width: progress+"%"}}> </div>
    )
}

export default Progressbar
