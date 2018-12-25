import React, { Component } from "react";
import Layout from "./Layout/layoutContainer";
import Content from "./Content";

const App = () => {
  return (
    <div>
      <Layout>
        <Content />
      </Layout>
    </div>
  );
};
export default App;
