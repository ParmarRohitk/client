import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/getAll").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name}, {item.age} years old
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <Link to={`/edit/${item._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewData;
