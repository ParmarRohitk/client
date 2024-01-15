import React, { useState } from "react";
import axios from "axios";

const AddData = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3000/api/post", { name, age });
      setName("");
      setAge("");
    } catch (error) {
      console.error(error);
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

export default AddData;
