// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

const App = () => {
  return (
    <Router>
      <div>
        {/*  <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Data</Link>
            </li>
          </ul>
        </nav> */}

        <Link path="/add">
          <AddData />
        </Link>
        <Link path="/edit/:id">
          <EditData />
        </Link>
        <Link path="/" exact>
          <Home />
        </Link>
      </div>
    </Router>
  );
};

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/getAll`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${apiUrl}/delete/${id}`);
        setData(data.filter((item) => item._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="data-list ">
      <h2 className="list-header">Data List</h2>
      <ul className="list-none p-0">
        {data.map((item) => (
          <li key={item._id} className="list-item">
            <div className="item-details">
              <span className="item-text">
                {item.name}, {item.age} years old
              </span>
              <div className="button-group">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <Link to={`/edit/${item._id}`} className="edit-button">
                  Edit
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddData = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/post`, { name, age });
      setName("");
      setAge("");
      alert("Data added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add data.");
    }
  };

  return (
    <div>
      <h2>Add Data</h2>
      <label>Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Age: </label>
      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      <br />
      <button onClick={handleAdd}>Add Data</button>
    </div>
  );
};

const EditData = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.item) {
      setName(location.state.item.name);
      setAge(location.state.item.age);
    }
  }, [location.state]);

  const handleEdit = async () => {
    try {
      await axios.patch(`${apiUrl}/update/${id}`, { name, age });
      alert("Data updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update data.");
    }
  };

  return (
    <div>
      <h2>Edit Data</h2>
      <label>Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Age: </label>
      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      <br />
      <button onClick={handleEdit}>Save Changes</button>
    </div>
  );
};

export default App;
