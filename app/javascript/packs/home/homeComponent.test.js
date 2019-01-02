import React from "react";
import ReactDOM from "react-dom";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import HomeComponent from "./homeComponent.jsx";

test("rendered component", () => {
  const wrapper = shallow(<HomeComponent name="Heiligers" />);
  expect(wrapper.find("div").children()).toHaveLength(2);
  expect(1).toEqual(1);
});
