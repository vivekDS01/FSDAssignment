import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5002/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Runs once when the component mounts: load existing users
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setUsers(res.data))
      .catch(() => setError("Could not load users. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post(API_URL, form);
      setUsers([...users, res.data]); // show the new user instantly
      setForm({ name: "", email: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the user.");
    }
  }

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Add User</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit">Save user</button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="card">
        <h2>Users ({users.length})</h2>
        {loading && <p>Loading...</p>}
        {!loading && users.length === 0 && <p>No users yet.</p>}
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;