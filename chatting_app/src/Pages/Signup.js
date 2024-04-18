import React, { useState } from 'react'
import './PageStyle/Style.css'
import Add from '../Image/addAvatar.png'

import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



import { auth ,storage,db} from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

import  {Link, useNavigate} from 'react-router-dom'
const Signup = () => {
  const [err, setError] = useState(false)

  const navigate = useNavigate()

  const handlesubmit= async(e)=>{
    e.preventDefault()
    const displayName= e.target[0].value;
    const email= e.target[1].value;
    const password= e.target[2].value;
    const file= e.target[3].files[0];


try {
const res =await createUserWithEmailAndPassword(auth, email, password)


const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on(
  "state_changed",
  null,
 
  (error) => {
     setError(true)
  }, 
  () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        console.log("Download URL" , downloadURL);
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      });
      await setDoc(doc( db,"users", res.user.uid),{
          uid:res.user.uid,
          displayName,
          email,
          photoURL:downloadURL,
      })
        await setDoc(doc(db,"userChat", res.user.uid),{

        })
      navigate("/login")
      

    });
    
  });


  
} catch (err) {
  setError(true)
  
}



  }




  
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
    <span className='logo'> Wege Chatting</span>
    <form onSubmit={handlesubmit}>
        <input type='text' placeholder='type name'/>
        <input type='email' placeholder='email'/>
        <input type='password' placeholder='password'/>
        <input style={{display:"none"}} type='file' id='file'/>
        <label htmlFor='file'>
        <img  src={Add} alt='no image'/>
        <span>Add Your Image</span>
        </label>
        <button>Sign UP</button>
        {err && <span>There is something wrong !!!</span>}
    </form>
    <p>you have an account ? <Link to="/login">Login </Link> </p>

    </div>

    </div>
  )
}

export default Signup