import { renderHook } from "@testing-library/react-hooks";
import { useApi } from "../useApi";

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

describe("useApi hook tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return loading state initially", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApi("https://jsonplaceholder.typicode.com/users")
    );
    // Response of a hook is in result.current
    const [data, loading, error] = result.current;

    expect(data).toBeUndefined();
    expect(loading).toBeTruthy();
    expect(error).toBeUndefined();

    // waitForNextUpdate as the hook initially returns true for loading with no payload
    // Then must wait for loading to turn false and the payload to be returned once the `fetchData()` promise has resolved inside the useEffect() inside useApi
    await waitForNextUpdate();
  });

  it("should return data when successfully fetching data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApi("https://jsonplaceholder.typicode.com/users")
    );

    // Payload will be returned and loading false after the first update
    await waitForNextUpdate();

    const [data, loading, error] = result.current;

    expect(data).toHaveLength(10);
    expect(loading).toBeFalsy();
    expect(error).toBeUndefined();
  });

  it("should return data if mocked data is returned when fetching data", async () => {
    // Mock the call to fetch(). This allows us to control the data returned from the API
    // Instead of being reliant on what the API returns
    jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValueOnce({
      ok: true,
      // Return a list of fake users
      json: async () => FAKE_USERS
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useApi("www.api.com")
    );
    let [data, loading, error] = result.current;

    expect(data).toBeUndefined();
    expect(loading).toBeTruthy();
    expect(error).toBeUndefined();
    // Verify fetch was called with the URL passed into the useApi hook
    expect(fetch).toHaveBeenCalledWith("www.api.com");

    await waitForNextUpdate();

    [data, loading, error] = result.current;
    expect(data).toEqual(FAKE_USERS);
    expect(loading).toBeFalsy();
    expect(error).toBeUndefined();
  });

  it("should return an error if an error occurs when fetching data", async () => {
    // Mocking fetch allows us to test what happens when an error occurs
    jest.spyOn(window, "fetch");
    const expectedError = new Error("Some error");
    // Force fetch to return an error
    window.fetch.mockImplementationOnce(() => Promise.reject(expectedError));

    const { result, waitForNextUpdate } = renderHook(() =>
      useApi("www.api.com")
    );
    let [data, loading, error] = result.current;

    expect(data).toBeUndefined();
    expect(loading).toBeTruthy();
    expect(error).toBeUndefined();
    expect(fetch).toHaveBeenCalledWith("www.api.com");

    await waitForNextUpdate();

    [data, loading, error] = result.current;
    expect(data).toEqual(undefined);
    expect(loading).toBeFalsy();
    expect(error).toEqual(expectedError);
  });
});
