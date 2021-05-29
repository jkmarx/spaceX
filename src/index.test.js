import React from "react";
import { render } from "@testing-library/react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "./stores/Root.js";
import App from "./App";

// You can write UI tests using testing-library or enzyme (or something else if you like!)

// Sample test using testing-library
test("renders the launches header", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/SpaceX Launches/i)).toBeInTheDocument();
});

// Sample test using enzyme
it("renders the launches header", () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(wrapper.contains(<h2> SpaceX Launches </h2>)).toEqual(true);
});
