import { useApi } from "./hooks/useApi";
import UsersList from "./components/UsersList";

/**
 * Main application body
 * Fetches data from the API, displaying loading message when loading, error message on errors
 * Displays a list of user's details once the data has been fetched
 */
const App = () => {
  // Call the useApi hook to fetch a list of users
  // The hook is responsible for loading and error handling
  // https://jsonplaceholder.typicode.com/users is a FAKE API
  // It helps with testing and prototyping and means I don't need to set up my own API
  const [data, loading, error] = useApi(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <div role="main">Loading...</div>;
  if (error) return <div role="main">Error!</div>;

  return (
    <div role="main">
      <UsersList data={data} />
    </div>
  );
};

export default App;
