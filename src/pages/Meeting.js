import React, { useState } from "react";
import Jitsi from "react-jitsi";
import { Box, Button, Flex } from "rebass";
import { Input, Label } from "@rebass/forms";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useTheme } from "emotion-theming";

function Meeting() {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");
  const [status, setStatus] = useState("IDLE");
  const theme = useTheme();

  function handleSubmit() {
    setStatus("VIDEO");
  }

  return (
    <Box mt={3}>
      {status === "IDLE" ? (
        <Box>
          <form onSubmit={handleSubmit}>
            <Box mt={3}>
              <Label
                htmlFor="room"
                sx={{
                  fontFamily: "body",
                }}
              >
                Room
              </Label>
              <Input
                id="room"
                placeholder="Room"
                sx={{
                  outline: "none",
                  fontFamily: "body",
                  ":focus": {
                    boxShadow: "input",
                  },
                }}
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
                value={room}
              ></Input>
            </Box>
            <Box mt={2}>
              <Label
                htmlFor="displayName"
                sx={{
                  fontFamily: "body",
                }}
              >
                DisplayName
              </Label>
              <Input
                placeholder="DisplayName"
                id="displayName"
                name="displayName"
                sx={{
                  outline: "none",
                  fontFamily: "body",
                  ":focus": {
                    boxShadow: "input",
                  },
                }}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                value={displayName}
              ></Input>
            </Box>
            <Box mt={2}>
              <Label
                htmlFor="password"
                sx={{
                  fontFamily: "body",
                }}
              >
                Password
              </Label>
              <Input
                placeholder="Password"
                id="password"
                name="password"
                sx={{
                  outline: "none",
                  fontFamily: "body",
                  ":focus": {
                    boxShadow: "input",
                  },
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              ></Input>
            </Box>
            <Box mt={2}>
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </Box>
      ) : (
        <Jitsi
          roomName={room}
          displayName={displayName}
          password={password}
          config={{ prejoinPageEnabled: false }}
          containerStyle={{ width: "100%", height: "70vh" }}
          loadingComponent={() => (
            <Flex
              justifyContent="center"
              height="100%"
              alignItems="center"
              color="primary"
            >
              <Loader
                width={150}
                height={150}
                color={theme.colors.primary}
                type="Hearts"
              ></Loader>
            </Flex>
          )}
        ></Jitsi>
      )}
    </Box>
  );
}

export default Meeting;
