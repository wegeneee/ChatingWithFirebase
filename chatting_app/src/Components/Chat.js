


import React, { useContext, useEffect, useState } from 'react';
import '../Pages/PageStyle/Style.css';
import Add from '../Image/image2.png';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser && currentUser.uid) {
        const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, [currentUser]);

  const handleSelect = (u) => {
    // Directly call dispatch to update state
    dispatch({ type: "CHANGE_USER", payload: u });
  };




  return (
    <div className='chat'>
    
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((mychat) => (
        <div
          className='userChat'
          key={mychat[0]}
          onClick={() => handleSelect(mychat[1].userInfo)} // Use arrow function to avoid state update during rendering
        >
          <img src={mychat[1].userInfo.photoURL} alt='no image' />
          <div className='userChatInfo'>
            <span>{mychat[1].userInfo.displayName}</span>
            <p>{mychat[1].lastMessage?.text}</p>
           
             
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
