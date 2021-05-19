import { formatUrl } from "../utils/urlFormatter";

/**
 * Component to display a list of user's details in a list
 * @param data: Array of users including id, name, email, and website
 */
const UsersList = ({ data }) => {
  return (
    <>
      <h1>Users list</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>
            Name: {user.name}, Email: {user.email}, Website:{" "}
            {formatUrl(user.website)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
