/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import {useContext} from 'react'
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import {AuthContext} from '../helpers/auth'

const Li = styled.li`
  display: inline-block;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

function Header() {
  const {setUser}=useContext(AuthContext)
  return (
    <header
      css={css`
        display: flex;
        justify-content:space-between;
      `}
    >
      <Link
        to="/"
        css={css`
          text-decoration: none;
          background-image: none;
        `}
      >
        <h3
          css={css`
            display: inline;
          `}
        >
          Chatty
        </h3>
      </Link>
      <ul
        css={css`
          list-style: none;
        `}
      >
        <Li>
          <Link to="/chat">Chat</Link>
        </Li>
        <Li>
          <Link to="/login">Login</Link>
        </Li>
        <Li>
          <Link onClick={()=>{setUser(undefined)}}>Logout</Link>
        </Li>
      </ul>
    </header>
  );
}

export default Header;
