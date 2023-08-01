import React from 'react'
import './Appbar.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
const Appbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const handleLogout=()=>{
    dispatch(logout(navigate));
  }
  const handleChat=()=>{
    navigate('/chat');
  }
  const handleHome=()=>{
    navigate('/');
  }
  return (
    <div className='appbar'>
      <div className='center'>Hostel Pro</div>
      <div className='row'>
      <div className='button'>
        <button className='logout' onClick={handleLogout}>Log Out</button>
      </div>
      <div className='name'>{user?.result?.name}</div>
      <button className='homeAppbar' onClick={handleHome}>Home</button>
      <button className='chatAppbar' onClick={handleChat}>Chat</button>
      </div>
    </div>
  )
}

export default Appbar
