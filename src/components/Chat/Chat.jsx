import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Chat.css'
import { useEffect } from 'react'
import ChatBar from '../ChatBar/ChatBar'
import ChatBody from '../ChatBody/ChatBody'
import ChatFooter from '../ChatFooter/ChatFooter'
import Appbar from '../Appbar/Appbar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUser } from '../../actions/user'
import { useRef } from 'react'
import Swal from 'sweetalert2'
const Chat = ({ socket }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const lastMessageRef = useRef(null);
  const [create,setCreate]=useState('');
  const [join,setJoin]=useState('');
  const myUser = useSelector((state) => state.user);
  console.log(myUser);
  useEffect(() => {
    if (user !== null) {
      console.log(socket.id);
      socket.emit('newUser', { name: user?.result?.name });
    }
  }, [user]);
  useEffect(() => {
    if (user !== null) {
      dispatch(getUser(user?.result?.email));

    }
  }, [user]);
 

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    socket.on('roomAlreadyPresent',()=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Room already present!!'
      });
    });
  }, [socket, messages]);
  console.log(socket);
 
 
 
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className='chat'>
      <Appbar />
      <div className='chatRow'>
        <ChatBar socket={socket} />
        <div className="chat__main">
          <ChatBody socket={socket} messages={messages} lastMessageRef={lastMessageRef} />
          <ChatFooter socket={socket} />
        </div>

      </div>
     
      
    </div>
  )
}

export default Chat
