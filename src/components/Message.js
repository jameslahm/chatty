import React, { useContext } from "react";
import { Image, Text, Flex, Box } from "rebass";
import format from "date-fns/format";
import { AuthContext } from "../helpers/auth";

function Message({ message }) {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Flex
        alignItems="center"
        flexDirection={message.uid === user.uid ? "row-reverse":"row"}
      >
        <Image
          src={message.photoURL}
          width={48}
          height={48}
          sx={{
            borderRadius: "50%",
          }}
        ></Image>
        <Box ml={3}>
          <Text fontSize={0} fontFamily="message">
            {message.displayName}-{" "}
            {format(message.timestamp, "hh:mmaaaa do MMM,yyyy")}
          </Text>
          <Text
            sx={{
              textShadow: "message",
            }}
            fontSize={4}
            fontFamily="message"
          >
            {message.content}
          </Text>
        </Box>
      </Flex>
    </div>
  );
}
export default Message;
