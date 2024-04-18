import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../Context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

const Messages = () => {
  const [messages,setMessages] = useState([]);
  const {data}= useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats" , data.chatId) ,(doc)=>{
    
       doc.exists() && setMessages(doc.data().messages);
    });
    return ()=>{
      unSub();
    };
  } ,[data.chatId]);

  console.log("the message is:", messages)
  console.log("the message is id:", data.chatId)
  return (
    <div className='messages'>
    
    {messages.map((m)=>(
      <Message message={m} key={m.id}/>
     ))}
    </div>
  )
}

export default Messages

