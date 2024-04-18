 import React, { useContext, useState } from 'react'
import '../Pages/PageStyle/Style.css'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from '../Firebase';
import { AuthContext } from '../Context/AuthContext';

const Search = () => {
  const [searchedUser,setSearchedUser] =useState("");
  const [chatUser ,setchatUser] =useState(null);
  const [err,setErr] =useState(false);
 
   const {currentUser}= useContext(AuthContext);

  const handleSearch=async()=>{
    const q = query(
      collection(db,"users"),
      where("displayName", "==",searchedUser)
    );

try {
  const querySnapshot = await getDocs(q);

  if(!querySnapshot.empty){
  querySnapshot.forEach((doc) => {
  setchatUser(doc.data());
  
  });
  setErr(false);
  }
  else{
    setchatUser(null);
    setErr(true)
  }


} catch (error) {
  setErr(true)
  console.error(err.message)
  
}

  };

  const handleKeydown=(e)=>{
    e.code === "Enter" && handleSearch();
  };




  // const handleSelect=async()=>{
  //   const combinedId =
  //   currentUser.uid > chatUser.uid
  //   ?currentUser.uid + chatUser.uid
  //   :chatUser.uid + currentUser.uid;

  //    try {
  //   const res = await getDoc(doc,(db,"chats",combinedId));

  //    if(!res.exists()){
  //     await setDoc(doc(db,"chats" ,combinedId),{ messages:[]});

  //     //create user chats
  //     await updateDoc(doc(db,"userChat" ,currentUser.uid),{
  //       [combinedId+".userInfo"]:{
  //         uid:chatUser.uid,
  //         displayName:chatUser.displayName,
  //         photoURL:chatUser.photoURL
  //       },
  //       [combinedId+".date"]:serverTimestamp(),
  //     });


  //       await updateDoc(doc(db,"userChat" ,chatUser.uid),{
  //       [combinedId+".userInfo"]:{
  //         uid:currentUser.uid,
  //         displayName:currentUser.displayName,
  //         photoURL:currentUser.photoURL
  //       },
  //       [combinedId+".date"]:serverTimestamp()
  //     });

  //    }

  //    } catch (error) {
      
  //    }
  //    setchatUser(null)
  //    setSearchedUser("")

  // }


  const handleSelect = async () => {
  const combinedId =
    currentUser.uid > chatUser.uid
      ? currentUser.uid + chatUser.uid
      : chatUser.uid + currentUser.uid;
      

  try {
    const chatRef = doc(db, "chats", combinedId);
    const chatSnapshot = await getDoc(chatRef);

    if (!chatSnapshot.exists()) {
      // Create the "chats" collection with an initial document
      await setDoc(chatRef, { messages: [] });

      // Update userChat for currentUser
      await updateDoc(doc(db, "userChat", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: chatUser.uid,
          displayName: chatUser.displayName,
          photoURL: chatUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      // Update userChat for chatUser
      await updateDoc(doc(db, "userChat", chatUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error(error.message);
  }

  setchatUser(null);
  setSearchedUser("");
};

  return (
    <div className='search'>
      <div className='searchForm'>

        <input type='text' 
        placeholder='search here' 
        onKeyDown={handleKeydown} 
        value={searchedUser}
        onChange={e=> setSearchedUser(e.target.value)}/>
      </div>
      {err && <span>The user is not exist</span>}
     {chatUser && (
      <div className='userChat' onClick={handleSelect}>
      <img src={chatUser.photoURL} alt='no image'/>
       
       <div className='userInfo'>
        <span>{chatUser.displayName}</span>
       </div>

      </div>
      )
      }

    </div>
  )
}

export default Search