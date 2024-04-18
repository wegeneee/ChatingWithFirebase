import { signOut } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { auth } from '../Firebase'
import { AuthContext } from '../Context/AuthContext'

const NavBar = () => {
  const {currentUser} = useContext(AuthContext);




// the ff is the user session out in the custom time interval
  // useEffect(()=>{
  //   const handleLogout=()=>{
  //     clearTimeout(sessionTimeout);
  //   }

  //   return ()=>handleLogout();
  //  },[]);

  //  const handleLogoutClick=()=>{
  //   signOut(auth).then(()=>{

  //   })
  //  };

  //  let sessionTimeout;
  //  const startSessionTimeout=()=>{
  //   sessionTimeout = setTimeout(()=>{
  //     handleLogoutClick();
  //   } ,3 * 60 *1000);   //im  3 min
  //  }

  //  startSessionTimeout();


  return (
    <div className='navbar'>
      <span className='logo'>Chatting</span>
      <div className='user'>
      <img src={currentUser.photoURL} alt='no image'/>
          <span>{currentUser.displayName}</span>
          <button onClick={()=>signOut(auth)}>Logout</button>
          {/* <button onClick={handleLogoutClick}>Logout</button> */}

      </div>
    </div>
  )
}

export default NavBar