import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MessageSelector } from "../../store/reducers/game";
import './style.css';

const MessageBubble = props => {
  let text = props.message.text, textAlign='auto';
  switch (props.message.type) {
    case 'GUESSED':
      text = props.message.user.name + ' guessed the word';
      textAlign='center';
      break
    case 'JOINED':
      text = props.message.user.name + ' joined';
      textAlign='center';
      break;
    case 'LEFT':
      text = props.message.user.name + ' left';
      textAlign='center';
      break;
    case 'CHAT':
    default:
      text = props.message.user.name + ': ' + props.message.text;
      break;
  }
  return (
    <div className={`message-bubble message-bubble-${props.message.type}`}>
      {text}
    </div>
  )
}

const MessagesBox = (props) => {
  console.log(props);
  return (
    <div className="messages-box">
      <div className="messages-header">
        <h5>Messages</h5>
      </div>
      <div className="messages-window">
        {props.messages.map((msg,i)=>(
          <MessageBubble key={i} message={msg}/>
        ))}
      </div>
      <div className="messages-input">
        <div className="btn">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2.66667C8.64002 2.66667 2.66669 8.64 2.66669 16C2.66669 23.36 8.64002 29.3333 16 29.3333C23.36 29.3333 29.3333 23.36 29.3333 16C29.3333 8.64 23.36 2.66667 16 2.66667ZM21.3333 17.3333H17.3333V21.3333C17.3333 22.0667 16.7333 22.6667 16 22.6667C15.2667 22.6667 14.6667 22.0667 14.6667 21.3333V17.3333H10.6667C9.93335 17.3333 9.33335 16.7333 9.33335 16C9.33335 15.2667 9.93335 14.6667 10.6667 14.6667H14.6667V10.6667C14.6667 9.93334 15.2667 9.33334 16 9.33334C16.7333 9.33334 17.3333 9.93334 17.3333 10.6667V14.6667H21.3333C22.0667 14.6667 22.6667 15.2667 22.6667 16C22.6667 16.7333 22.0667 17.3333 21.3333 17.3333Z" fill="#999999" />
          </svg>
        </div>
        <input type="text" placeholder="Guess Here" />
        <div className="btn">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9867 2.66667C8.62669 2.66667 2.66669 8.64001 2.66669 16C2.66669 23.36 8.62669 29.3333 15.9867 29.3333C23.36 29.3333 29.3334 23.36 29.3334 16C29.3334 8.64001 23.36 2.66667 15.9867 2.66667ZM11.3334 10.6667C12.44 10.6667 13.3334 11.56 13.3334 12.6667C13.3334 13.7733 12.44 14.6667 11.3334 14.6667C10.2267 14.6667 9.33335 13.7733 9.33335 12.6667C9.33335 11.56 10.2267 10.6667 11.3334 10.6667ZM22.28 19.6267C21.0667 22.2267 18.72 24 16 24C13.28 24 10.9334 22.2267 9.72002 19.6267C9.50669 19.1867 9.82669 18.6667 10.32 18.6667H21.68C22.1734 18.6667 22.4934 19.1867 22.28 19.6267ZM20.6667 14.6667C19.56 14.6667 18.6667 13.7733 18.6667 12.6667C18.6667 11.56 19.56 10.6667 20.6667 10.6667C21.7734 10.6667 22.6667 11.56 22.6667 12.6667C22.6667 13.7733 21.7734 14.6667 20.6667 14.6667Z" fill="#999999" />
          </svg>
        </div>
      </div>
    </div>
  )
}

MessagesBox.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = (state) => ({
  messages: MessageSelector(state),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBox)
