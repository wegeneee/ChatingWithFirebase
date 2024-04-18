import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';


const Message = ({message}) => {

  const {currentUser}= useContext(AuthContext);
  const {data} =useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);




const handleDownload = (imageUrl) => {
  try {
    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'image.jpg'; // You can set a custom filename here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};




  console.log(message)
  return (
    <div ref={ref} className= {`message ${message.senderId === currentUser.uid && "owner"}`}>

        <div className='messageInfo'>
            <img src={message.senderId === currentUser.uid
            ?currentUser.photoURL
            :data.user.photoURL
            }
             alt='no image'/>
            <p>Just now</p>

        </div>

         <div className='messageContent'>
         <p>{message.text} </p>
         {message.img &&
         <div>
          <img src={message.img} alt='no image'/>
           <button onClick={() => handleDownload(message.img)}>Dwnd</button>

 
         </div>
         
          }
            
        </div>
    </div>
  )
}

export default Message