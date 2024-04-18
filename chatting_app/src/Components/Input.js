import React, {useContext, useEffect, useState } from 'react'
import Add from '../Image/attach.png'
import FileImg from '../Image/img.png'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {v4 as uuid} from 'uuid';
import { db, storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import SimpleWebRTC from 'simplewebrtc';


const Input = () => {

  const [text,setText] = useState("");
  const [img,setImg]= useState(null);

  const {currentUser}=  useContext(AuthContext);
  const {data}= useContext(ChatContext);
  const [isCalling, setIsCalling] = useState(false);


  const handleSend =async()=>{
    if(img){
      const storageRef = ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef,img);


uploadTask.on(
  "state_changed",
  null,
 
  (error) => {
    //  setError(true)
  }, 
  () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
   
        await updateDoc(doc(db,"chats", data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
          img:downloadURL,
        }),
      });

    });
    
  });

    }else{
      await updateDoc(doc(db,"chats", data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
          
        }),
      });
    }

    await updateDoc(doc(db,"userChat" , currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+ ".date"]:serverTimestamp()
    })


       await updateDoc(doc(db,"userChat" , data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+ ".date"]:serverTimestamp()
    })


    setImg(null);
    setText("");

  }


    useEffect(() => {
    // Clean up SimpleWebRTC when the component unmounts
    return () => {
      webrtc.stopLocalVideo();
      webrtc.leaveRoom();
    };
  }, []);

  const webrtc = new SimpleWebRTC ({
    localVideoEl: 'localVideo', // ID of the local video element
    remoteVideosEl: '', // ID of the remote video element (if displaying remote video)
    autoRequestMedia: true,
    debug: false,

  });

const handleVideoCall = () => {
  if (isCalling) {
    // If already in a call, stop the call and camera
    webrtc.stopLocalVideo();
    webrtc.leaveRoom();
    setIsCalling(false);
  } else {
    // Otherwise, start the camera and join the call room
    webrtc.startLocalVideo();
    webrtc.joinRoom(data.chatId);
    setIsCalling(true);
  }
};





  console.log("sent from/ loged user" ,currentUser.uid)
  console.log("sent to", data.user.uid)

  return (
    <div className='input'>
      <input type='text'  placeholder='Type something here...' value={text} onChange={(e)=>setText(e.target.value)}/>
       <div className='send'>
       <img src={Add} alt='no image'/>
       <input type='file' style={{display:"none"}} id='file' onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src ={FileImg} alt='no image'/>
        </label>
        <button onClick={handleSend} >Send</button>
         <button onClick={handleVideoCall}>{isCalling ? 'Stop' : 'Call'}</button>
   
       </div>
       {/* <div id='localVideo'></div> */}
    </div>
  )
}

export default Input


