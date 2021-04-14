import React,{useState} from 'react';
import Imagegrid from './comps/Imagegrid';
import Modal from './comps/Modal';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';

import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase/config"
import firebase from "./firebase/config"

const sighInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

const Signinsignout = () => (
  <div>
  <button onClick={sighInWithGoogle}>Sign In With Google</button>
  </div>
)




const App = () => {
  const [user] = useAuthState(auth);
  // console.log(user)
  const [selectedimg, setselectedimg] = useState(null)
  return (
    <div className="App">
      <Title/>
      {user?(<UploadForm />):(<Signinsignout/>)}
      <Imagegrid setselectedimg={setselectedimg}/>
      {selectedimg && <Modal selectedimg={selectedimg} setselectedimg={setselectedimg}/>}
    </div>
  );
}

export default App;
