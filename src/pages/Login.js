import React, { useState } from "react";
import { signin } from "../helpers/auth";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "rebass";
import { Input, Label } from "@rebass/forms";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signin(email, password);
    } catch {}
  };
  return (
    <Box>
      <Heading fontSize={4} mt={4}>
        Login to <Link to="/" style={{color:"inherit"}}>Chatty</Link>
      </Heading>
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <Label
            htmlFor="email"
            sx={{
              fontFamily: "body",
            }}
          >
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            sx={{
              outline: "none",
              fontFamily: "body",
              ":focus": {
                boxShadow: "input",
              },
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></Input>
        </Box>
        <Box mt={2}>
          <Label
            htmlFor="Password"
            sx={{
              fontFamily: "body",
            }}
          >
            Password
          </Label>
          <Input
            type="password"
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
        <Text mt={1} fontFamily="body" fontSize={2}>
          Don't have an account? <Link to="/signup">SignUp</Link>
        </Text>
      </form>
    </Box>
  );
}
export default Login;
