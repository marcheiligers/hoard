import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const App = () => {
  return (
    <div className="app">
      <Sidebar className="sidebar" />
      <Main className="main" />
    </div>
  );
};
export default App;
