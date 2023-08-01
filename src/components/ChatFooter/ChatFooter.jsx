import React from 'react'
import './ChatFooter.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
const ChatFooter = ({socket}) => {
  const dispatch=useDispatch();
  const [message, setMessage] = useState('');
  

  const myUser = useSelector((state) => state.user);
  console.log(myUser);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
   
    if (message.length!==0) {
      socket.emit('message', {
        text: message,
        name: myUser?.data?.name,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  )
}

export default ChatFooter
