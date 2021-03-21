import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { createContext, useState } from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Ride from "./Components/Ride/Ride";
import Login from './Components/Login/Login'
import Book from "./Components/Book/Book";
import Blog from "./Components/Blog/Blog";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext()
function App() {
  const [user, setUser] = useState({
    name: null,
    error: null,
    loggedIn: false
})
  return (
    <UserContext.Provider value={[user , setUser]} >
      <Router>
        <Header />
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route  path='/login'>
            <Login></Login>
          </Route>
          <Route path="/ride">
            <Ride></Ride>
          </Route>
          <PrivateRoute path="/book/:ticketId">
            <Book></Book>
          </PrivateRoute>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
