import React from 'react';
import { FaSmile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <FaSmile /> HyperChat
        </h1>
        <Link to="/about">About</Link>
      </header>
      <main className="join-main">
        <form action="chat">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <input
              type="text"
              name="room"
              id="room"
              placeholder="Room"
              required
            />
          </div>
          <button type="submit" className="btn">
            Join Room
          </button>
        </form>
      </main>
    </div>
  );
}
