import { useEffect, useRef, useState } from "react";
import SocketIOClient from "socket.io-client";

interface IMsg {
  user: string;
  msg: string;
}

const user = 'chase'

const Index = () => {

  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect((): any => {
    // connect to socket server
    // @ts-ignore
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        // @ts-ignore
        user,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    // @ts-ignore
    inputRef?.current?.focus();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage();
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> Chat App</h1>
        <a href="index.html" className="btn">Leave Room</a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name"></h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul id="users">
          </ul>
        </div>
        <div className="message-wrapper">
          <div className="chat-messages">
            {chat.map((c) => (
              <div className="message">
                <p className="meta">{c.user} <span>{new Date().toISOString()}</span></p>
                <p className="text">{c.msg}</p>
              </div>
            ))}
          </div>
          <div className="is-typing"></div>
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={msg}
            placeholder={connected ? "Type a message..." : "Connecting..."}
            disabled={!connected}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </div>
  )
};

export default Index;
