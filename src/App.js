import React, { Component } from "react";
import FriendsList from "./containers/FriendsList/FriendsList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <FriendsList />
      </div>
    );
  }
}

export default App;
