import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditData = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/getOne/${id}`).then((response) => {
      setName(response.data.name);
      setAge(response.data.age);
    });
  }, [id]);

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/update/${id}`, {
        name,
        age,
      });
    } catch (error) {
      console.error(error);
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

export default EditData;
