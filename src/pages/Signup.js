import { Link } from "react-router-dom";
import React, { useState } from "react";
import { signup, signInWithGoogle, signInWithGithub } from "../helpers/auth";
import { Box, Heading, Flex, Text, Button } from "rebass";
import { Input, Label } from "@rebass/forms";
import { FaGithub, FaGoogle } from "react-icons/fa";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
    } catch {}
  };

  const googleSignIn = () => {
    signInWithGoogle();
  };

  const githubSignIn = () => {
    signInWithGithub();
  };

  return (
    <Box>
      <Heading fontSize={3} mt={4}>
        Sign Up to{" "}
        <Link to="/" style={{ color: "inherit" }}>
          Chatty
        </Link>
      </Heading>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box mt={2}>
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
            name="email"
            type="email"
            value={email}
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
            name="password"
            type="password"
            value={password}
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
          ></Input>
        </Box>
        <Box mt={2}>
          <Button type="submit">Submit</Button>
        </Box>
        <Heading mt={3} mb={0} fontSize={2}>
          OR
        </Heading>
        <Box mt={1}>
          <Button
            mr={2}
            variant="secondary"
            onClick={googleSignIn}
            type="button"
          >
            <Flex>
              <Text mr={2}>Sign up with Google</Text>
              <FaGoogle></FaGoogle>
            </Flex>
          </Button>
          <Button variant="secondary" onClick={githubSignIn} type="button">
            <Flex>
              <Text mr={2}>Sign up with Github</Text>
              <FaGithub></FaGithub>
            </Flex>
          </Button>
        </Box>
        <Text mt={1} fontFamily="body" fontSize={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </form>
    </Box>
  );
}

export default SignUp;
