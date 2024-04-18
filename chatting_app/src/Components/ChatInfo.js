import React, { useContext } from 'react'
import Add from '../Image/add.png'
import Cam from '../Image/cam.png'
import More from '../Image/more.png'
import Messages from '../Components/Messages';
import Input from './Input';
import '../Pages/PageStyle/Style.css'
import { ChatContext } from '../Context/ChatContext';


const ChatInfo = () => {

  const {data}= useContext(ChatContext);
  return (
    <div className='chatInfoBar'>
    <div className='chatinfo'>
   <span>{data.user?.displayName}</span> 


    <div className='chatIcons'>
        <img src={Cam} alt='no image'/>
        <img src={Add} alt='no image'/>
        <img src={More} alt='no image'/>
    </div>
    </div>
    <Messages/>
    <Input/>


    </div>
  )
}

export default ChatInfo