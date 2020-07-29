import { Link } from "react-router-dom";
import React, { useState } from "react";
import { signup, signInWithGoogle, signInWithGithub } from "../helpers/auth";

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
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h1>
          Sign Up to
          <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button type="submit">Submit</button>
          <p>or</p>
          <button onClick={googleSignIn} type="button">
            Sign up with Google
          </button>
          <p>or</p>
          <button onClick={githubSignIn} type="button">
            Sign up with Github
          </button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
