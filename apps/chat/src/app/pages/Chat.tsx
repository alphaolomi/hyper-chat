import {
  default as React,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useState,
  FormEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { FaCommentAlt, FaPaperPlane, FaComment } from 'react-icons/fa';
import { SocketContext } from '../context/socket';
// import { Link } from 'react-router-dom';
interface IUser {
  id: string;
  username: string;
  room: string;
}

interface IMessage {
  id: string;
  username: string;
  text: string;
  time: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Users = ({ users }) => {
  return (
    <ul id="users">
      {users.map((user) => (
        <li>{user.username}</li>
      ))}
    </ul>
  );
};

const Message = ({ username, text, time }) => {
  return (
    <>
      <p className="meta">
        {username} <span>{time}</span>
      </p>
      <p className="text">{text}</p>
    </>
  );
};

const Messages = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message
          key={message.id}
          username={message.username}
          text={message.text}
          time={message.time}
        />
      ))}
    </div>
  );
};

const Chat = () => {
  const inputMessageRef = useRef(null);
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');
  // const [joined, setJoined] = useState(false);

  const [room, setRoom] = useState('');
  const [username, setUserName] = useState('');

  const [users, setUsers] = useState<Array<IUser>>([]);

  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const query = useQuery();

  // Emit message to server
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Emit message to server
    socket.emit('chatMessage', message);
    // Clear input
    setMessage('');
    // focus Input
    inputMessageRef.current.focus();
  };

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:
    setUserName(query.get('username'));
    setRoom(query.get('room'));

    // emit joinRoom event
    socket.emit('joinRoom', { username, room });

    // Get room and users
    socket.on('roomUsers', ({ room, users }) => {
      setRoom(room);
      setUsers([...users]);
    });

    // Message from server
    socket.on('message', (msg: IMessage) => {
      // console.log(message);
      setMessages([...messages, msg]);

      // Scroll down
      // chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
    };
  }, [socket, room, messages, username, query]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <FaCommentAlt size={24} />
          HyperChat
        </h1>
        <a href="index.html" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">

          <h3>
            <FaComment size={16} /> Room Name:
          </h3>
          <h2 id="room-name"> {room}</h2>

          <h3>
            <i className="fas fa-users" /> Users
          </h3>
          {/*  */}
          {/* <ul id="users" /> */}
          <Users users={users} />
          {/*  */}
        </div>

        {/*  */}
        {/* <div className="chat-messages" /> */}
        <Messages messages={messages} />
        {/*  */}
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleFormSubmit}>
          <input
            ref={inputMessageRef}
            id="msg"
            value={message}
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn">
            <FaPaperPlane size={16} /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
