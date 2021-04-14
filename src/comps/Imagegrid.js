import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import useFirestore from "../customhooks/useFirestore"
import { projectFirestore } from '../firebase/config';
import {auth} from "../firebase/config"
import firebase from "../firebase/config"

const Imagegrid = ({setselectedimg}) => {
    const {docs} = useFirestore('images')
    // console.log(docs)
    const [user] = useAuthState(auth);
    
    const handleLikes = (docId, useruid, doclikes) => {
        const imagecollection = projectFirestore.collection('images').doc(docId);
        // console.log(imagecollection.onSnapshot(snap=>{console.log("snap",snap.data())}))
        if (!doclikes.includes(useruid)){
            // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
            imagecollection.update({ likes: firebase.firestore.FieldValue.arrayUnion(useruid)})
        }else{
            imagecollection.update({ likes: firebase.firestore.FieldValue.arrayRemove(useruid)})
        }
    }

    const handleDelete = (docId) => {
        projectFirestore.collection('images').doc(docId).delete()
    }

    return (
        <div className="img-grid">
            {docs && docs.map(doc=>(
                <div className="img-wrap" key={doc.id}>
                    <p>uploadedby {doc.uploadedby}</p>
                    <img src={doc.url} className="img-wrap" onClick={()=>setselectedimg(doc.url)} loading="lazy" width="200px" height="200px" alt="loadImages" />
                    <div className="likeanddelete">
                    {user && <p className="like" onClick={()=>handleLikes(doc.id, user.uid, doc.likes)}>
                        {doc.likes.includes(user.uid)? <span>UnLike {doc.likes.length}</span>:<span>Like {doc.likes.length}</span>} 
                        </p>}
                    {!user && <p className="like" >Total Likes {doc.likes.length}</p>}
                    {user && user.displayName===doc.uploadedby && <p className="delete" onClick={()=>handleDelete(doc.id)}><span>delete</span></p>}
                    </div>
                    
                    
                </div>
            ))}
        </div>
    )
}

export default Imagegrid
