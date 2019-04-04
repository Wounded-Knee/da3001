import React from "react";
import Enzyme, { mount } from "enzyme";
import User from "./User.js";
import Adapter from 'enzyme-adapter-react-16';
import { userData } from './data/TestData.js';

Enzyme.configure({ adapter: new Adapter() })

describe("User", () => {
  let props, mountedUser;

  const user = (user, me) => {
    if (!mountedUser) {
      mountedUser = mount(
        <User {...props} user={user} me={me} />
      );
    }
    return mountedUser;
  }

  beforeEach(() => {
    props = {};
    mountedUser = undefined;
  });
  
  it("recognizes current user", () => {
    expect(
      user(
        userData[0],
        userData[0]
      )
      .find("li")
      .hasClass('me')
    ).toEqual(true);
  });

  it("does not call other users 'me'", () => {
    expect(
      user(
        userData[0],
        userData[1]
      )
      .find("li")
      .hasClass('me')
    ).toEqual(false);
  });
});
