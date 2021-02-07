import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
export default function Chat() {
  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <FaCommentAlt />HyperChat
        </h1>
        <a href="index.html" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <FaComment /> Room Name:
          </h3>
          <h2 id="room-name"> </h2>
          <h3>
            <i className="fas fa-users" /> Users
          </h3>
          <ul id="users" />
        </div>
        <div className="chat-messages" />
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn">
            <FaPaperPlane /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
