import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {projectStorage, projectFirestore, timestamp} from "../firebase/config"

const useStorage = (file, auth) => {
    const [progress, setprogress] = useState(0)
    const [error, seterror] = useState(null)
    const [url, seturl] = useState(null)
    
    const [user] = useAuthState(auth);
    // console.log(user)

    useEffect(() => {
        // References
        const storageRefs = projectStorage.ref(file.name)
        // console.log("storageRefs", storageRefs)
        const collectionRef = projectFirestore.collection('images');

        storageRefs.put(file).on('state_changed', (snap) => {
        // console.log("snap", snap)
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setprogress(percentage);
        }, (err) => {
            seterror(err);
          }, async () => {
            const url = await storageRefs.getDownloadURL();
            const createdAt = timestamp();
            await collectionRef.add({uploadedby:user.displayName, url, createdAt, likes:[]});
            seturl(url);
          })
    }, [file, user.displayName])

    return { progress, url, error };
}

export default useStorage
