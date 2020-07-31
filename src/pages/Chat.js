import React, { useEffect, useState, useContext } from "react";
import { db } from "../services/firebase";
import { AuthContext } from "../helpers/auth";
import Message from "../components/Message";
import { Label, Input } from "@rebass/forms";
import { Button, Box, Text, Flex } from "rebass";
import { useTheme } from "emotion-theming";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(12);
  useEffect(() => {
    return db
      .collection("chats")
      .orderBy("timestamp")
      .limit(count)
      .onSnapshot((snapshot) => {
        setMessages([
          ...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        ]);
      });
  }, [count]);

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

  const theme = useTheme();

  function handleLoadMore() {
    setCount((count) => count + 12);
  }

  return (
    <Box mt={4}>
      <Box
        sx={{ border: `2px solid ${theme.colors.primary}`, overflow: "auto" }}
        p={3}
        mb={2}
      >
        <Flex justifyContent="center">
          <Button
            py={2}
            px={2}
            fontSize={1}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleLoadMore();
            }}
          >
            Load More
          </Button>
        </Flex>
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
