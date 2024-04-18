import React from 'react'
import '../Pages/PageStyle/Style.css'
import SideBar from '../Components/SideBar';
import ChatInfo from '../Components/ChatInfo';



const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
          <SideBar/>
          <ChatInfo/>
        </div>
    </div>


  )
}

export default Home