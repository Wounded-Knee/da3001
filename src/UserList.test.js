import React from "react";
import Enzyme, { mount } from "enzyme";
import UserList from "./UserList.js";
import Adapter from 'enzyme-adapter-react-16';
import { userData } from './data/TestData.js';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() })

describe("UserList", () => {
  let component;

  const getComponent = (props) => {
    if (!component) {
      component = mount(
        <UserList {...props} />
      );
    }
    return component;
  }

  beforeEach(() => {
    component = undefined;
  });
  
  it("renders normally", () => {
    expect(
      getComponent({
        users: userData,
        cardFan: false
      })
      .find("ul")
      .first()
      .hasClass('cardFan')
    ).to.equal(false);
  });

  it("renders cardFan", () => {
    const component = getComponent({
      users: userData,
      cardFan: true
    });

    expect(
      component
      .find("ul")
      .first()
      .hasClass('cardFan') 
    ).to.equal(true);
  });

  it("ignores cardFan for single-user list", () => {
    expect(
      getComponent({
        users: [userData[0]],
        cardFan: true
      })
      .find("ul")
      .first()
      .hasClass('cardFan')
    ).to.equal(false);
  });
});
