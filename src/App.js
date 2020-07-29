/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch,Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthContext } from "./helpers/auth";
import Header from "./components/Header";
import "./helpers/theme";
import { ThemeProvider } from "emotion-theming";

function App() {
  const [user, setUser] = useState(auth().currentUser);
  // eslint-disable-next-line no-unused-vars
  const [theme, setTheme] = useState({
    spacing: (n) => `${(8 * n).toString()}px`,
  });

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{user,setUser}}>
        <Router>
          <div
            css={css`
              max-width: 650px;
              padding:0 1rem;
              margin: 3rem auto;
            `}
          >
            <Header></Header>

            <Switch>
              <Route exact path="/" component={Home}></Route>
              <PrivateRoute
                path="/chat"
                authenticated={!!user}
                component={Chat}
              ></PrivateRoute>
              <PublicRoute
                path="/signup"
                authenticated={!!user}
                component={Signup}
              ></PublicRoute>
              <PublicRoute
                path="/login"
                authenticated={!!user}
                component={Login}
              ></PublicRoute>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
