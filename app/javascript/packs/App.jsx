import React, { Component } from "react";
// import Sidebar from "./Sidebar";
import Layout from "./Layout";
import Main from "./Main";

const App = () => {
  return (
    <div>
      {/*<Sidebar className="sidebar" />*/}
      <Layout>
        <Main />
      </Layout>
    </div>
  );
};
export default App;
