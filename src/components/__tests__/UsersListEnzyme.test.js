// Test the UsersList component using enzyme
import React from "react";
import { shallow } from "enzyme";
import UsersList from "../UsersList";

const FAKE_USERS = [
  {
    id: 1,
    name: "First Name",
    email: "myemail1@email.com",
    website: "website.com"
  },
  {
    id: 2,
    name: "Second Name",
    email: "myemai21@email.com",
    website: "www.website2.com"
  },
  {
    id: 3,
    name: "Third Name",
    email: "myemail3@email.com",
    website: "website3.com"
  }
];

describe("<UsersList/> component test with enzyme", () => {
  it("should match stored snapshot", () => {
    const wrapper = shallow(<UsersList data={FAKE_USERS} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the users list heading correctly", () => {
    const wrapper = shallow(<UsersList data={FAKE_USERS} />);
    expect(wrapper.find("h1").text()).toEqual("Users list");
  });

  it("should render the users list from the supplied data", () => {
    const wrapper = shallow(<UsersList data={FAKE_USERS} />);

    const listItems = wrapper.find("li");
    expect(listItems).toHaveLength(3);
    expect(listItems.at(0).text()).toEqual(
      "Name: First Name, Email: myemail1@email.com, Website: www.website.com"
    );
    expect(listItems.at(1).text()).toEqual(
      "Name: Second Name, Email: myemai21@email.com, Website: www.website2.com"
    );
    expect(listItems.at(2).text()).toEqual(
      "Name: Third Name, Email: myemail3@email.com, Website: www.website3.com"
    );
  });
});
