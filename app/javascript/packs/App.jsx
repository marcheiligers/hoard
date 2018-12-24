import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Main />
    </div>
  );
};
export default App;
