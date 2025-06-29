import { useParams, useLocation } from 'react-router-dom';

function Sample() {
  const { id } = useParams();
  const location = useLocation();
  const user = location.state;

  if (!user) {
    return <p>No user data available. (Try navigating from the list)</p>;
  }
 


  return (
    <div>
      <h2>User Details</h2>
      <ul>
        <li>ID: {id}</li>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        {/* <li>City: {user.address.city}</li>
        <li>Phone: {user.phone}</li> */}
      </ul>
      
    </div>
  );
}

export default Sample;

