import React, { useState, createContext, useContext, useRef } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/Navbar";
import Landing from "./Components/Landing";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Authentication/PrivateRoute";
import { Provider } from "./state";
import Footer from "./Components/Footer";
import Info from "./Components/Info";
import Notes from "./Components/Notes";
import Axios from "axios";
const TEACHER = "TEACHER";

function App() {
  const store = useRef({});

  function setTeacher(teacher, tag = 1) {
    localStorage.setItem(TEACHER, JSON.stringify(teacher));
  }

  function getTeacher() {
    return JSON.parse(localStorage.getItem(TEACHER));
  }

  function isAuthenticated() {
    if (getTeacher()) {
      return true;
    } else return false;
  }

  function logout() {
    localStorage.removeItem(TEACHER);
  }

  function getAnnouncementDetails() {
    if (getTeacher()) {
      return getTeacher().teacher.announcements;
    }
  }

  async function addAnnouncement(data) {
    let response;
    if (data == "") {
      return null;
    }
    await Axios.post(
      // https://collegespace123.herokuapp.com
      "http://localhost:8000/college/teacher/announcements",
      {
        announcements: data == "" ? null : data,
      },
      {
        headers: {
          Authorization: `Bearer ${getTeacher().token}`,
        },
      }
    ).then((res) => {
      response = res;
    });
    return response;
  }

  async function getAnnouncementDetailsByInputName(value) {
    let response;
    const url = "http://localhost:8000/college/teacher/details";
    //http://localhost:3000/announcements
    const data = {
      name: value,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    await Axios.post(url, data, headers).then((res) => {
      console.log(res);
      response = res;
    });
    return response;
  }

  return (
    <Provider
      value={{
        store,
        setTeacher,
        getTeacher,
        isAuthenticated,
        logout,
        getAnnouncementDetails,
        addAnnouncement,
        getAnnouncementDetailsByInputName,
      }}
    >
      <Router>
        <Switch>
          <Route path="/" exact>
            <>
              <NavigationBar key="1" />
              <Landing />
              <Footer />
            </>
          </Route>
          <Route path="/signup">
            <>
              <NavigationBar key="2" />
              <Signup />
            </>
          </Route>
          <Route path="/login">
            <>
              <NavigationBar key="3" />
              <Login />
            </>
          </Route>
          <PrivateRoute path="/dashboard">
            <>
              <NavigationBar key="4" />
              <Dashboard />
            </>
          </PrivateRoute>
          <Route path="/notes">
            <>
              <NavigationBar key="5" />
              <Notes />
            </>
          </Route>
          <Route path="/announcements">
            <>
              <NavigationBar key="6" />
              <Info />
            </>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
