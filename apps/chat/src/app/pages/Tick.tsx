import React, { useState, useEffect } from 'react';
// import { Manager } from 'socket.io-client';
import { io } from 'socket.io-client';

const Tick = () => {
  const [response, setResponse] = useState('');
  const [d, setD] = useState('');

  useEffect(() => {
    // const manager = new Manager();
    // const socket = manager.socket("");
    // todo close socket
    const socket = io("http://localhost:3333", {})
    socket.on('tick', (data) => {
      setResponse(data);
    });

  }, []);

  return (
    <main className="join-main">
      <form action="chat.html">
        <div className="form-control">
          <p>
            It's
            <time dateTime={response}>{response}</time>
            {d}
          </p>
        </div>
      </form>
    </main>
  );
};

export default Tick;
