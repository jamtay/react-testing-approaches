// Test the UsersList component using react-testing-library
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import UsersList from "../UsersList";
import { axe } from "jest-axe";

// Create a fake list of users to control what data is displayed on the page
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

describe("<UsersList/> component test with react-testing-library", () => {
  it("should match stored snapshot", () => {
    const tree = renderer.create(<UsersList data={FAKE_USERS} />).toJSON();

    // Compare the snapshot created to the snapshot inside the __snapshots__ directory
    // The snapshot inside __snapshots__ was created automatically when first running this test
    expect(tree).toMatchSnapshot();
  });

  // Add async keyword to test declaration
  it("should not have accessibility violations", async () => {
    const { container } = render(<UsersList data={FAKE_USERS} />);
    const results = await axe(container);

    // Check the rendered component has no violations
    expect(results).toHaveNoViolations();
  });

  it("should render the users heading", () => {
    render(<UsersList data={FAKE_USERS} />);

    // The screen variable allows you to access the DOM and check the component was rendered as expected
    // In this case check for the header text to be displayed properly
    const headingText = screen.getByText(/Users list/i);
    // Assert the element is in the document and therefore displayed
    expect(headingText).toBeInTheDocument();
  });

  it("should render the users list from the supplied data", () => {
    render(<UsersList data={FAKE_USERS} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
    expect(listItems[0].textContent).toEqual(
      "Name: First Name, Email: myemail1@email.com, Website: www.website.com"
    );
    expect(listItems[1].textContent).toEqual(
      "Name: Second Name, Email: myemai21@email.com, Website: www.website2.com"
    );
    expect(listItems[2].textContent).toEqual(
      "Name: Third Name, Email: myemail3@email.com, Website: www.website3.com"
    );
  });
});
