import React, { useState } from "react";
import { signin } from "../helpers/auth";
import { Link } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Login to <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to login to your account</p>
        <div>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></input>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <p>
          Don't have an account? <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
