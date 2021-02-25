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
import { FaUsers, FaCommentAlt, FaPaperPlane, FaComment } from 'react-icons/fa';
import { SocketContext } from '../context/socket';

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

const Users = ({ users }:{users:Array<IUser>}) => {
  return (
    <>
      <h3>
        <FaUsers size={18} /> Users
      </h3>
      <ul id="users">
        {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </>
  );
};

const Message = ({ username, text, time }:{username:string, text:string, time:string}) => {
  return (
    <>
      <p className="meta">
        {username} <span>{time}</span>
      </p>
      <p className="text">{text}</p>
    </>
  );
};

const Messages = ({ messages }: {messages:Array<IMessage>}) => {
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
  const query = useQuery();
  const inputMessageRef = useRef(null);
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');

  const [room, setRoom] = useState(query.get('room') || '');
  const [username, setUserName] = useState(query.get('username') || '');

  const [users, setUsers] = useState<Array<IUser>>([]);
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  // Emit message to server
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('chatMessage', message);
    setMessage('');
    inputMessageRef.current.focus();
  };

  const handleDisconnect = useCallback(() => {
    socket.emit('disconnect');
  }, []);

  useEffect(() => {
    // emit joinRoom event
    socket.emit('joinRoom', { username, room });

    // Get room and users
    socket.on('roomUsers', ({ room, users }) => {
      setRoom(room);
      setUsers([...users]);
    });

    // Message from server
    socket.on('message', (message:IMessage) => {
      setMessages(messages => [...messages,...[message]]);
      // Scroll down
      // chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    return () => {
      // before the component is destroyed
      handleDisconnect()
    };
  }, []);

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

          <Users users={users} />
        </div>

        <Messages messages={messages} />
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
