import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Box, Button, Flex, Heading, Image, Text } from "rebass";
import {
  createPeerConnection,
  registerLietener,
  emit,
  socket,
  callUser,
  recvOffer,
  recvAnswer,
} from "../helpers/socket";
import { AuthContext } from "../helpers/auth";
import { useTheme } from "emotion-theming";

const Video = function () {
  const localVideoContainer = useRef(null);
  const remoteVideoContainer = useRef(null);
  const [userList, setUserList] = useState([]);
  const { user } = useContext(AuthContext);
  const socketIdContainer = useRef(null);
  const peerConnectionContainer = useRef(null);

  function closeConnection() {
    if (peerConnectionContainer.current) {
      peerConnectionContainer.current.ontrack = null;
      peerConnectionContainer.current.onicecandidate = null;
      peerConnectionContainer.current.close();
      peerConnectionContainer.current = null;
    }
    if (remoteVideoContainer.current.srcObject) {
      remoteVideoContainer.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
    if (localVideoContainer.current.srcObject) {
      localVideoContainer.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
    remoteVideoContainer.current.removeAttribute("src");
    remoteVideoContainer.current.removeAttribute("srcObject");
    localVideoContainer.current.removeAttribute("src");
    localVideoContainer.current.removeAttribute("srcObject");
  }

  async function initConnection() {
    peerConnectionContainer.current = await createPeerConnection(
      localVideoContainer.current,
      remoteVideoContainer.current
    );

  }

  const handleSocket = useCallback(async (type, data) => {
    if (type === "update-user-list") {
      setUserList(data.users.filter((user) => user.socketId !== socket.id));
    }
    if (type === "call-made") {
      let peerConnection = peerConnectionContainer.current;
      if (!peerConnection) {
        await initConnection();
        recvOffer(peerConnectionContainer.current, data);
      } else {
        recvOffer(peerConnection, data);
      }
      peerConnection = null;
    }
    if (type === "answer-made") {
      recvAnswer(peerConnectionContainer.current, data);
    }
    if (type === "hang-up-made") {
      closeConnection();
    }
    if (type === "candidate-made") {
      if (data.candidate) {
        await peerConnectionContainer.current.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    }
  }, []);

  useEffect(() => {
    registerLietener("update-user-list", (data) =>
      handleSocket("update-user-list", data)
    );
    registerLietener("call-made", (data) => handleSocket("call-made", data));
    registerLietener("answer-made", (data) =>
      handleSocket("answer-made", data)
    );
    registerLietener("hang-up-made", (data) =>
      handleSocket("hang-up-made", data)
    );
    registerLietener("candidate-made", (data) =>
      handleSocket("candidate-made", data)
    );
    initConnection();
    if (user) {
      emit("add-user", {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        socketId: socket.id,
      });
    }
  }, [handleSocket, user]);

  const theme = useTheme();

  return (
    <>
      <Flex mt={4} sx={{ boxShadow: "input" }} minHeight="80vh">
        <Box
          flex="0 1 auto"
          pt={2}
          sx={{ borderRight: `2px solid ${theme.colors.primary}` }}
        >
          <Heading pl={2} pr={2} fontSize={3}>
            User List
          </Heading>
          {userList.map((user) => {
            return (
              <Flex
                px={2}
                mt={2}
                key={user.socketId}
                alignItems="center"
                tabIndex="0"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#eeecec",
                    backgroundOrigin: "padding-box",
                  },
                  ":focus": {
                    backgroundColor: "#cbcaca",
                    outline: "none",
                  },
                }}
                onClick={async () => {
                  if (!peerConnectionContainer.current) {
                    await initConnection();
                    callUser(peerConnectionContainer.current, user.socketId);
                    socketIdContainer.current = user.socketId;
                  } else {
                    if (peerConnectionContainer.current.localDescription) {
                      return;
                    }
                    callUser(peerConnectionContainer.current, user.socketId);
                    socketIdContainer.current = user.socketId;
                  }
                }}
              >
                <Image
                  src={user.photoURL}
                  width={48}
                  height={48}
                  sx={{
                    borderRadius: "50%",
                  }}
                ></Image>
                <Text
                  ml={2}
                  fontSize={4}
                  fontFamily="message"
                  key={user.socketId}
                >
                  {user.displayName}
                </Text>
              </Flex>
            );
          })}
        </Box>
        <Box flex="1 0 0" sx={{ position: "relative" }}>
          <Box
            width={100}
            height={100}
            sx={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <video
              style={{ objectFit: "cover" }}
              width="100%"
              height="100%"
              ref={localVideoContainer}
              muted
              autoPlay
            ></video>
          </Box>
          <video
            style={{ objectFit: "cover" }}
            width="100%"
            height="100%"
            ref={remoteVideoContainer}
            autoPlay
          ></video>
        </Box>
      </Flex>
      <Flex flexDirection="row-reverse" mt={2}>
        <Button
          onClick={() => {
            closeConnection();
            if (socketIdContainer.current)
              emit("hang-up", { to: socketIdContainer.current });
          }}
        >
          Hang Up
        </Button>
      </Flex>
    </>
  );
};

export default Video;
