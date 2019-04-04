import React from "react";
import Enzyme, { mount } from "enzyme";
import User from "./User.js";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe("User", () => {
  let props,
    mountedUser;
  const user = () => {
    if (!mountedUser) {
      mountedUser = mount(
        <User {...props} />
      );
    }
    return mountedUser;
  }

  beforeEach(() => {
    props = {
      user: {
        avatar: 'avatar',
        tags: []
      }
    };
    mountedUser = undefined;
  });
  
  it("always renders a div", () => {
    const divs = user().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});
