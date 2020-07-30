import React from "react";
import { AuthContext } from "../helpers/auth";
import { useContext } from "react";
import { Box, Text, Image } from "rebass";
import welcomeSvg from "../assets/img/welcome.svg";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <Box mt={4}>
      <Text fontFamily="body">
        Welcome! {user ? user.displayName : "Anonymous"}
      </Text>
      <Image src={welcomeSvg}></Image>
    </Box>
  );
}

export default Home;
