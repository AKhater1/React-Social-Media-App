import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import {useImmerReducer} from "use-immer";

import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Profile from './components/Profile';
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import FlashMessages from "./components/FlashMessages";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

Axios.defaults.baseURL = "http://localhost:8080";

function App() {

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("socialAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("socialAppToken"),
      username: localStorage.getItem("socialAppUsername"),
      avatar: localStorage.getItem("socialAppAvatar")
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "loggedIn":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "loggedOut":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if(state.loggedIn){
      localStorage.setItem("socialAppToken", state.user.token)
      localStorage.setItem("socialAppUsername", state.user.username)
      localStorage.setItem("socialAppAvatar", state.user.avatar)
    }else{
      localStorage.removeItem("socialAppToken")
      localStorage.removeItem("socialAppUsername")
      localStorage.removeItem("socialAppAvatar")
    }

  },[state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />

          <Header />

          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id">
              <SinglePost />
            </Route>
          </Switch>

          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
