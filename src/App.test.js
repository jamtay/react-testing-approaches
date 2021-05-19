import { render, screen } from "@testing-library/react";
import App from "./App";
import * as hooks from "./hooks/useApi";

// Create a set of fake users to mock the response from the users API. This allows more control in the tests
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

describe("<App /> component test with mocked useApi hook", () => {
  //  After each test reset the mocks so each test is a clean run and not interfered by the next test
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should display loading message when App opens", () => {
    // Mock the useApi hook to control the response
    // Returning the loading state to test how loading works
    jest
      .spyOn(hooks, "useApi")
      .mockImplementation(() => [undefined, true, undefined]);
    render(<App />);

    const loadingMessage = screen.getByText(/Loading.../i);
    expect(loadingMessage).toBeInTheDocument();

    const usersListHeading = screen.queryByText(/Users list/i);
    expect(usersListHeading).not.toBeInTheDocument();
  });

  it("should display users list once the users list has returned", () => {
    jest
      .spyOn(hooks, "useApi")
      .mockImplementation(() => [FAKE_USERS, false, undefined]);
    render(<App />);

    const usersListHeading = screen.getByText(/Users list/i);
    expect(usersListHeading).toBeInTheDocument();

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

  it("should display an error message if an error is returned from useApi", () => {
    // Mocking the response allows to easily test for errors.
    // Return an error response to check how the component handles that
    jest
      .spyOn(hooks, "useApi")
      .mockImplementation(() => [
        undefined,
        false,
        new Error("An error occurred")
      ]);
    render(<App />);

    // The error message should be displayed and no loading or users should be displayed
    const errorMessage = screen.getByText(/Error!/i);
    expect(errorMessage).toBeInTheDocument();

    const usersListHeading = screen.queryByText(/Users list/i);
    expect(usersListHeading).not.toBeInTheDocument();

    const loadingMessage = screen.queryByText(/Loading.../i);
    expect(loadingMessage).not.toBeInTheDocument();
  });
});
