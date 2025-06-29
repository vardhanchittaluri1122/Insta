import { lazy, Suspense, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Root = lazy(() => import("./Root"));

function App() {
  const [contents, setcontents] = useState([]);
  const [boolen, setboolen] = useState(false);
  const user = useRef(null);
  const email = useRef(null);

  const fectching = async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await data.json();
      console.log(result);
      setcontents(result);
      setboolen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setcontents((contents) => contents.filter((c) => c.id !== id));
  };

  const update = (e) => {
    e.preventDefault();
    const id = Number(user.current.value);
    const ema = email.current.value;
    setcontents((prev) =>
      prev.map((value) =>
        value.id === id ? { ...value, email: ema } : value
      )
    );
  };

  return (
    <>
      <button id="val" onClick={fectching}>FETCH</button>

      <form onSubmit={update}>
        <input type="number" ref={user} placeholder="User ID" />
        <input type="email" ref={email} placeholder="New Email" />
        <input type="submit" />
      </form>
      {boolen &&
        contents.map((content) => (
          <div key={content.id}>
            <Suspense fallback={<div><center>Loading...</center></div>}>
              <Root
                user={content}
                ondelete={() => handleDelete(content.id)}
              />
            </Suspense>
            <p>{content.username}</p>
            <Link to={`sample/${content.id}`} state={content}>View Details</Link>
          </div>
        ))}

      <Outlet />
      <br />
      <br />
      <Link to="/login">Back</Link>
    </>
  );
}

export default App;
