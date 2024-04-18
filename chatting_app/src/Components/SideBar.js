import React from 'react'
import NavBar from './NavBar'
import Search from './Search'
import Chat from './Chat'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <NavBar/>
      <Search/>
      <Chat/>
    </div>
  )
}

export default SideBar