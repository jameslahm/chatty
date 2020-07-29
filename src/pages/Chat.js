import React, { useEffect, useState, useContext } from "react";
import { db } from "../services/firebase";
import { AuthContext } from "../helpers/auth";
import Message from '../components/Message'

function Chat() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const {user} = useContext(AuthContext);

  useEffect(() => {
    return db.collection("chats").onSnapshot((snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("chats").add({
      content: content,
      timestamp: Date.now(),
      uid: user.uid,
    });
    setContent("");
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <Message key={message.timestamp} message={message}></Message>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
}

export default Chat;
