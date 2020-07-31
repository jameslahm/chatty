import React from "react";
import { Link } from "react-router-dom";
import { Flex, Heading, Box } from "rebass";
import { auth } from "../services/firebase";

function Header() {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Link to="/">
        <Heading color="text" fontSize={5}>
          Chatty
        </Heading>
      </Link>
      <Flex>
        <Box mr={2}>
          <Link to="/meeting">
            <Heading color="primary">Meeting</Heading>
          </Link>
        </Box>
        <Box mr={2}>
          <Link to="/video">
            <Heading color="primary">Video</Heading>
          </Link>
        </Box>
        <Box mr={2}>
          <Link to="/chat">
            <Heading color="primary">Chat</Heading>
          </Link>
        </Box>
        <Box mr={2}>
          <Link to="/login">
            <Heading color="primary">Login</Heading>
          </Link>
        </Box>
        <Box>
          <Link
            to="/"
            onClick={() => {
              auth().signOut();
            }}
          >
            <Heading color="primary">Logout</Heading>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;
