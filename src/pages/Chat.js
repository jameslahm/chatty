import React, { useEffect, useState, useContext } from "react";
import { db } from "../services/firebase";
import { AuthContext } from "../helpers/auth";
import Message from "../components/Message";
import { Label, Input } from "@rebass/forms";
import { Button, Box, Text } from "rebass";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    return db
      .collection("chats")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
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
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    setContent("");
  };

  return (
    <Box mt={4}>
      <Box>
        {messages.map((message, i) => (
          <Box key={message.id} my={2}>
            <Message message={message}></Message>
          </Box>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <Label
          sx={{
            fontFamily: "body",
            fontSize: 3,
          }}
          htmlFor="messsage"
        >
          Message
        </Label>
        <Input
          id="message"
          sx={{
            outline: "none",
            ":focus": {
              boxShadow: "input",
            },
            fontFamily: "body",
          }}
          name="message"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        ></Input>
        <Button mt={2} type="submit">
          Submit
        </Button>
      </form>
      <Text fontFamily="body" mt={1}>
        Login in as: <strong>{user.email}</strong>
      </Text>
    </Box>
  );
}

export default Chat;
