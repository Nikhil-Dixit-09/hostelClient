import React from 'react'
import './ChatBody.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ChatBody = (props) => {
  const navigate = useNavigate();
  const myUser = useSelector((state) => state.user);
  const handleLeaveChat = () => {
    props.socket.emit('leaving');
    navigate('/');
  };
  return (
    <div className='chatBody'>
      <header className="chat__mainHeader">
        <p className='hangout'>Hangout with hostel mates</p>
        <div className='leavebutton'>
          <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </div>

      </header>


      <div className="message__container" ref={props.lastMessageRef}>
        {props.messages.map((message) =>
          message.name === myUser?.data?.name ? (

            <div className="message__chats righty" key={message.id}>
              <div className='columnFlex'>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>

            </div>


          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ChatBody
