import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthContext } from "./helpers/auth";
import Header from "./components/Header";
import { ThemeProvider } from "emotion-theming";
import theme from "./helpers/theme";
import { Box } from "rebass";
import Video from "./pages/Video";
import Meeting from "./pages/Meeting";

function App() {
  const [user, setUser] = useState(auth().currentUser);
  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Box maxWidth="750px" mx="auto" pt={3} px={2}>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <PrivateRoute
                path="/meeting"
                authenticated={!!user}
                component={Meeting}
              ></PrivateRoute>
              <PrivateRoute
                path="/video"
                authenticated={!!user}
                component={Video}
              ></PrivateRoute>
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
          </Box>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
